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
          <el-form-item prop="username">
            <h4><i class="el-icon-user-solid"></i>用户名</h4>
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <div class="pass-tip">
              <h4><i class="el-icon-key"></i>密码</h4>
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
        <span><i class="el-icon-info"></i>&nbsp;该博客目前只有一个主人哦~</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { login } from "@/network/admin";
import Logo from "@/components/svg/Logo";
import avatarUrl from "@/assets/img/EvanZhao.jpg";
import { btnLoading, btnLoadingClose } from "@/utils/loading";
export default {
  name: "AdminLoign",
  components: {
    Logo,
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("兄弟，用户名不能为空啊"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("兄弟，密码你确定不填？"));
      } else callback();
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
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          btnLoading(this.button.login);
          let result = await login({
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          });
          btnLoadingClose(this.button.login, "登录");
          if (result.data.status) {
            localStorage.setItem("adminToken", result.data.data.token);
            this.$notify({
              title: "成功",
              message: "登录成功！",
              type: "success",
              duration: 2000,
            });
            this.$router.push("/hzz/add");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/userStyle/login.scss";
</style>
