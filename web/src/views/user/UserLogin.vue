<template>
  <el-row type="flex" justify="center" align="center" id="content">
    <el-col :xs="20" :sm="12" :md="10" :lg="7">
      <el-card class="box-card">
        <div class="avatar">
          <el-avatar :size="70" :src="avatar" />
        </div>
        <div class="svg-container">
          <Logo />
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="email">
            <h4><i class="el-icon-user-solid"></i>邮箱地址</h4>
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <div class="pass-tip">
              <h4><i class="el-icon-key"></i>密码</h4>
              <el-link
                type="primary"
                :underline="false"
                class="link"
                @click="findPass"
                >忘记密码？</el-link
              >
            </div>
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button
              id="login"
              :type="button.login.type"
              :disabled="button.login.disabled"
              :loading="button.login.loading"
              @click="submitForm('ruleForm')"
              >{{ button.login.text }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <div class="footer">
        <span><i class="el-icon-question"></i>&nbsp;目前没有账号?</span>
        <router-link to="/register">创建一个账号</router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { userLogin, getLoginAvatar } from "@/network/user";
import Logo from "@/components/svg/Logo";
import avatarUrl from "@/assets/img/avatar-default.png";
import { btnLoading, btnLoadingClose } from "@/utils/loading";
export default {
  name: "UserLogin",
  components: {
    Logo,
  },
  data() {
    //验证邮箱正则表达式
    let emailRegExp = /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;
    let checkEmail = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮件地址不能为空！"));
      } else if (!emailRegExp.test(value)) {
        callback(new Error("邮箱格式错误！"));
      } else {
        let email = this.ruleForm.email;
        let res = await getLoginAvatar({ email });
        this.avatar = res.data.data.avatar;
        callback();
      }
    };
    let passRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passRegExp.test(value)) callback(new Error("密码格式错误"));
      else callback();
    };
    return {
      avatar: avatarUrl,
      button: {
        login: {
          text: "登录",
          type: "primary",
          loading: false,
          disabled: false,
        },
      },
      ruleForm: {
        pass: "",
        email: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          btnLoading(this.button.login);
          let result = await userLogin({
            email: this.ruleForm.email,
            password: this.ruleForm.pass,
          });
          btnLoadingClose(this.button.login, "登录");
          if (result.data.status) {
            this.$store.commit("setToken", result.data.data.token);
            this.$notify({
              title: "成功",
              message: "登录成功！",
              type: "success",
              duration: 2000,
            });
            this.$router.push("/");
          }
        } else {
          return false;
        }
      });
    },
    findPass() {
      let email = this.ruleForm.email;
      if (!email) email = 0; //路由参数默认值0
      this.$router.push({
        name: "UserFindPass",
        params: { email },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/userStyle/login.scss";
</style>
