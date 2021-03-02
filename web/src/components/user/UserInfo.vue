<template>
  <div class="UserInfo">
    <el-card class="header">
      <div class="base-info">
        <el-avatar :src="avatarUrl"></el-avatar>
        <div class="base-info-data">
          <div class="username">
            <i class="el-icon-user-solid"></i>
            <span class="label">用户名&nbsp;:&nbsp;</span>
            <span class="data">{{ userInfo.username }}</span>
          </div>
          <div class="account-age">
            <i class="el-icon-s-flag"></i>
            <span class="label">园龄&nbsp;:&nbsp;</span>
            <span class="data">{{ accountAge }}</span>
          </div>
          <div class="collection">
            <i class="el-icon-star-on"></i>
            <span class="label">收藏&nbsp;:&nbsp;</span>
            <span class="data">未开放</span>
          </div>
        </div>
      </div>
      <el-divider direction="vertical"></el-divider>
      <div class="integrity">
        <el-progress
          type="circle"
          :percentage="percentage"
          :color="colors"
          :stroke-width="8"
          :width="110"
        ></el-progress>
        <p>资料完整度</p>
      </div>
    </el-card>
    <el-card class="main">
      <div slot="header" class="clearfix">
        <span class="title">基本信息</span>
      </div>
      <el-form
        :model="ruleForm"
        size="small"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱">
          <el-input
            autocomplete="off"
            :value="ruleForm.email"
            disabled
            class="email"
          ></el-input>
          <div class="tip">
            <i class="el-icon-lock"></i>
            <i>&nbsp;邮箱已绑定</i>
          </div>
        </el-form-item>
        <el-form-item label="显示昵称" prop="alias">
          <el-input
            v-model="ruleForm.alias"
            autocomplete="off"
            class="alias"
          ></el-input>
          <div class="tip">
            <i>*昵称最多8个字符，不能有空格、换行符</i>
          </div>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender" size="mini">
            <el-radio-button :label="1">男</el-radio-button>
            <el-radio-button :label="2">女</el-radio-button>
            <el-radio-button :label="0">保密</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标语" prop="slogan">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="随便讲讲呗...20字符以内"
            v-model="ruleForm.slogan"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="save">
      <el-button type="primary" class="save" @click="saveInfo('ruleForm')"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "@/network/user";
export default {
  name: "UserInfo",
  inject: ["reload"], //注入
  data() {
    let regExp1 = /^[^\s]{0,8}$/;
    let validateAlias = (rule, value, callback) => {
      if (!regExp1.test(value)) {
        callback(new Error("用户名不符合规则"));
      } else {
        callback();
      }
    };
    let regExp2 = /^.{0,20}$/;
    let validatePetPhrase = (rule, value, callback) => {
      if (!regExp2.test(value)) {
        callback(new Error("标语内容超出限制"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        usernmae: "",
        account_create_time: 0,
      },
      avatarUrl: "",
      colors: [
        { color: "#F56C6C", percentage: 31 },
        { color: "#E6A23C", percentage: 61 },
        { color: "#409EFF", percentage: 91 },
        { color: "#67C23A", percentage: 100 },
      ],
      ruleForm: {
        alias: "",
        slogan: "",
        birthday: "",
        gender: 2,
        email: "",
      },
      rules: {
        alias: [{ validator: validateAlias, trigger: "blur" }],
        slogan: [{ validator: validatePetPhrase, trigger: "blur" }],
      },
    };
  },
  methods: {
    saveInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let alias = this.ruleForm.alias;
          let birthday = this.ruleForm.birthday;
          let gender = this.ruleForm.gender;
          let slogan = this.ruleForm.slogan;
          let res = await updateUserInfo({ alias, birthday, gender, slogan });
          if (res.data.status) {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              type: "success",
              duration: 2000,
            });
            this.reload();
          }
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    accountAge() {
      let now = new Date().getTime();
      let age = now - this.userInfo.account_create_time;
      // 一个月：1000 * 60 * 60 * 24 * 30
      let month = age / (1000 * 60 * 60 * 24 * 30);
      // 一年：1000 * 60 *60 * 24 * 365
      let year = age / (1000 * 60 * 60 * 24 * 365);
      if (month < 1) {
        return `小于一个月`;
      } else if (month >= 1 && year < 1) {
        return `${Math.floor(month)}个月`;
      } else {
        return `${year.toFixed(1)}年`;
      }
    },
    percentage() {
      let data = [
        this.ruleForm.alias,
        this.ruleForm.slogan,
        this.ruleForm.birthday,
        this.ruleForm.gender,
        this.ruleForm.email,
      ];
      let total = data.length;
      let completeData = data.filter((item) => {
        return item;
      });
      return Math.round((completeData.length / total) * 100);
    },
  },
  async mounted() {
    let target = document.getElementsByClassName("UserInfo")[0];
    try {
      let res = await getUserInfo(target);
      //初始化数据
      this.ruleForm.gender = res.data.data.gender;
      this.ruleForm.alias = res.data.data.alias;
      this.ruleForm.birthday = res.data.data.birthday;
      this.ruleForm.slogan = res.data.data.slogan;
      this.ruleForm.email = res.data.data.email;
      this.userInfo.username = res.data.data.username;
      this.userInfo.account_create_time = res.data.data.account_create_time;
      this.avatarUrl = res.data.data.avatar;
    } catch (e) {
      this.$router.push("/login");
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/userStyle/userInfo.scss";
</style>