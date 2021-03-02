<template>
  <div id="content">
    <el-card class="box-card">
      <div class="svg-container">
        <Logo />
      </div>
      <el-steps
        :active="step"
        finish-status="success"
        simple
        style="margin-bottom: 20px; background: white"
      >
        <el-step title="验证" :icon="icon.send"></el-step>
        <el-step title="重置" :icon="icon.reset"></el-step>
        <el-step title="完成" :icon="icon.finish"></el-step>
      </el-steps>
      <div class="container" :class="{ formActive: isActive }">
        <el-form
          :model="emailForm"
          :rules="emailRules"
          ref="emailForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <h4><i class="el-icon-user-solid"></i>邮箱地址</h4>
            <div class="item">
              <el-input v-model="emailForm.email"></el-input>
              <el-button
                id="send"
                :type="button.send.type"
                :loading="button.send.loading"
                :disabled="button.send.disabled"
                @click="sendEmail('emailForm')"
                >{{ button.send.text }}</el-button
              >
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <h4><i class="el-icon-document-checked"></i>验证码</h4>
            <el-input v-model="emailForm.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :type="button.validate.type"
              :disabled="button.validate.disabled"
              :loading="button.validate.loading"
              id="validate"
              @click="validate('emailForm')"
              >{{ button.validate.text }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-form
          :model="passForm"
          :rules="passRules"
          ref="passForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="pass">
            <h4><i class="el-icon-key"></i>密码</h4>
            <el-input type="password" v-model="passForm.pass"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <h4><i class="el-icon-key"></i>确认密码</h4>
            <el-input
              type="password"
              v-model="passForm.checkPass"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              id="reset"
              :type="button.reset.type"
              :disabled="button.reset.disabled"
              :loading="button.reset.loading"
              @click="resetPass('passForm')"
              >{{ button.reset.text }}
            </el-button>
          </el-form-item>
        </el-form>
        <transition name="el-fade-in">
          <div class="finish" v-if="isFinish">
            <i class="el-icon-success"></i>
            <span>密码修改成功！点击完成跳转到登录页</span>
            <el-button type="primary" size="medium" @click="finish"
              >完成</el-button
            >
          </div>
        </transition>
      </div>
    </el-card>
    <div class="footer">
      <span><i class="el-icon-info"></i>&nbsp;密码丢失了也不要紧哦！</span>
      <router-link to="/register">旧的不去，新的不来</router-link>
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
import { sendEmail, validateCode, findPass } from "@/network/user";
import Logo from "@/components/svg/Logo";
import Vcode from "vue-puzzle-vcode";
import Img1 from "@/assets/img/puzzle/puzzle1.jpg";
import Img2 from "@/assets/img/puzzle/puzzle2.png";
import Img3 from "@/assets/img/puzzle/puzzle3.jpg";
import { btnLoading, btnLoadingClose, countdownButton } from "@/utils/loading";

export default {
  name: "UserLogin",
  components: {
    Logo,
    Vcode,
  },
  data() {
    //邮箱
    let emailRegExp = /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱地址"));
      } else if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
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
    //密码 规则：6-18位且只能是数字和字母
    let passRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passRegExp.test(value))
        callback(
          new Error("密码必须包含且只能是数字和字母，长度在6-18位之间的")
        );
      else {
        if (this.passForm.checkPass !== "") {
          this.$refs.passForm.validateField("checkPass");
        }
        callback();
      }
    };
    //确认密码
    let validateCheckPass = (rule, value, callback) => {
      if (value === "") callback(new Error("请再次输入密码"));
      else if (value !== this.passForm.pass)
        callback(new Error("两次输入的密码不一致"));
      else callback();
    };
    return {
      imgs: [Img1, Img2, Img3], //拼图的img数组
      isShow: false, // Vcode验证码模态框是否出现
      isActive: false,
      isFinish: false, //密码是否修改成功
      step: 0,
      button: {
        send: {
          text: "发送验证码",
          type: "primary",
          loading: false,
          disabled: false,
        },
        validate: {
          text: "验证",
          type: "primary",
          loading: false,
          disabled: false,
        },
        reset: {
          text: "重置",
          type: "primary",
          loading: false,
          disabled: false,
        },
      },
      icon: {
        send: "el-icon-s-promotion",
        reset: "el-icon-edit",
        finish: "el-icon-success",
      },
      emailForm: {
        email: "",
        code: "",
      },
      passForm: {
        pass: "",
        checkPass: "",
      },
      emailRules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
      passRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    validate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //记载动画
          btnLoading(this.button.validate);
          //验证
          let email = this.emailForm.email;
          let code = this.emailForm.code;
          let res = await validateCode({ email, code });
          if (res.data.status) {
            sessionStorage.setItem("PIN", res.data.data.PIN);
            this.step += 1;
            this.icon.send = "";
            this.isActive = true;
          }
          //关闭button loading
          btnLoadingClose(this.button.validate, "验证");
        } else return false;
      });
    },
    resetPass(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //打开button loading
          btnLoading(this.button.reset);
          //modify password
          let email = this.emailForm.email;
          let password = this.passForm.pass;
          let PIN = sessionStorage.getItem("PIN");
          let res = await findPass({ email, password, PIN });
          if (res.data.status) {
            this.step += 1;
            this.icon.reset = "";
            this.isFinish = true;
          }
          //关闭button loading
          btnLoadingClose(this.button.reset, "重置");
        } else return false;
      });
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
      //加载动画
      btnLoading(this.button.send);
      //发送验证码
      let res = await sendEmail({ email: this.emailForm.email });
      if (res.data.status) {
        this.$notify({
          title: "成功",
          message: res.data.msg,
          type: "success",
        });
        countdownButton(this.button.send, 60, "重新发送");
      }
    },
    vcodeClose() {
      this.isShow = false;
    },
    finish() {
      this.step += 1;
      this.icon.finish = "";
      setTimeout(() => {
        this.$router.push("/login");
      }, 500);
    },
  },
  created() {
    //初始化赋值
    let email = this.$route.params.email;
    if (email) {
      this.emailForm.email = email;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/userStyle/findPass.scss";
</style>