<template>
  <div class="register-floor">
    <div class="cont" :class="{ active: isActive }">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm sign-up"
        label-position="top"
        size="medium"
      >
        <h2>创建你的账号</h2>
        <el-form-item prop="email" label="邮箱地址">
          <el-input v-model="ruleForm.email" id="email" />
        </el-form-item>
        <el-form-item prop="pass" label="密码">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            id="pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input v-model="ruleForm.code" id="code" />
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button
            id="send"
            :type="button.send.type"
            :loading="button.send.loading"
            :disabled="button.send.disabled"
            @click="sendEmail('ruleForm')"
            >{{ button.send.text }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            :type="button.register.type"
            :disabled="button.register.disabled"
            :loading="button.register.loading"
            @click="register('ruleForm')"
            >{{ button.register.text }}</el-button
          >
        </el-form-item>
      </el-form>
      <div class="sub-cont">
        <div class="img">
          <div class="img-text">
            <div class="svg-container">
              <Logo ref="logo" />
            </div>
            <div class="text-item sign-up-text">
              <p>很高兴认识你！</p>
              <p>注册个账号，交个朋友吧！</p>
            </div>
            <div class="text-item notice-text">
              <p>对人以诚信，人不欺我</p>
              <p>对事以诚信，事无不成</p>
            </div>
          </div>
          <el-checkbox v-model="isChecked" class="agreement"
            ><font color="#F56C6C">*&nbsp;</font
            >我已阅读并同意遵守用户协议</el-checkbox
          >
          <div class="img-btn" @click="toggleClass">
            <span class="img-btn-notice">用户协议</span>
            <span class="img-btn-up">注册</span>
          </div>
        </div>
        <div class="notice">
          <h2>用户协议</h2>
          <Agreement :size="[550, 450]" />
        </div>
      </div>
    </div>
    <div class="footer">
      <span><i class="el-icon-info"></i>&nbsp;芜湖~&nbsp;突然想起了密码！</span>
      <router-link to="/login">这就去登录</router-link>
    </div>
    <Vcode
      :show="isShow"
      @success="vcodeSuccess"
      @close="vcodeClose"
      :canvasWidth="400"
      :canvasHeight="200"
      :imgs="imgs"
    />
  </div>
</template>
<script>
import Vcode from "vue-puzzle-vcode";
import Agreement from "@/components/user/Agreement";
import Logo from "@/components/svg/Logo";
import Img1 from "@/assets/img/puzzle/puzzle1.jpg";
import Img2 from "@/assets/img/puzzle/puzzle2.png";
import Img3 from "@/assets/img/puzzle/puzzle3.jpg";
import { userRegister, sendEmail } from "@/network/user";
import { btnLoading, btnLoadingClose, countdownButton } from "@/utils/loading";
export default {
  name: "UserRegister",
  data() {
    //验证邮箱正则表达式
    let emailRegExp = /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮件地址不能为空！"));
      } else if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式错误！"));
      } else {
        callback();
      }
    };
    //密码 规则：6-18位且只能是数字和字母
    let passRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passRegExp.test(value))
        callback(new Error("6-18位，只能是且必须包含数字和字母"));
      else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //验证码
    let codeRegExp = /^\d{6}$/;
    let validateCode = (rule, value, callback) => {
      if (value === "") callback(new Error("请输入验证码"));
      else if (!codeRegExp.test(value)) callback(new Error("验证码为6位数字"));
      else callback();
    };

    return {
      imgs: [Img1, Img2, Img3], //拼图的img数组
      isShow: false, // Vcode验证码模态框是否出现
      isActive: false, //切换按钮是否激活
      isChecked: false,
      button: {
        register: {
          text: "注册",
          type: "info",
          loading: false,
          disabled: true,
        },
        send: {
          text: "发送验证码",
          type: "primary",
          loading: false,
          disabled: false,
        },
      },
      ruleForm: {
        email: "",
        pass: "",
        code: "",
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur", required: "true" }],
        pass: [{ validator: validatePass, trigger: "blur", required: "true" }],
        code: [{ validator: validateCode, trigger: "blur", required: "true" }],
      },
    };
  },
  components: {
    Logo,
    Vcode,
    Agreement,
  },
  watch: {
    isChecked(newValue) {
      if (newValue) {
        this.button.register.disabled = false;
        this.button.register.type = "primary";
      } else {
        this.button.register.disabled = true;
        this.button.register.type = "info";
      }
    },
  },
  methods: {
    register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let btnTxt = this.button.register.text;
          btnLoading(this.button.register); //加载动画
          //提交
          let email = this.ruleForm.email;
          let password = this.ruleForm.pass;
          let code = this.ruleForm.code;
          let res = await userRegister({ email, password, code });
          //成功回调
          if (res.data.status) {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
            this.$router.push("/login"); //跳转到login页
          }
          btnLoadingClose(this.button.register, btnTxt);
          //关闭加载动画
        } else return false;
      });
    },
    toggleClass() {
      this.isActive = !this.isActive;
    },
    sendEmail(formName) {
      this.$refs[formName].validateField("email", (emailError) => {
        if (!emailError) {
          this.isShow = true;
        } else return false;
      });
    },
    async vcodeSuccess() {
      this.isShow = false;
      let btnTxt = this.button.send.text;

      btnLoading(this.button.send);
      //发送邮件
      let email = this.ruleForm.email;
      let res = await sendEmail({ email });
      //成功回调
      if (res.data.status) {
        countdownButton(this.button.send, 60, "重新发送"); //倒计时按钮
        this.$notify({
          title: "成功",
          message: res.data.msg,
          type: "success",
        });
      } else {
        btnLoadingClose(this.button.send, btnTxt);
      }
    },
    vcodeClose() {
      this.isShow = false;
    },
  },
  mounted() {
    this.$refs["logo"].color = "#ecf0f1";
  },
};
</script>

<style lang="scss">
//此处需修改elment-ui组件的样式，不能使用scoped
@import "@/assets/scss/userStyle/register.scss";
</style>