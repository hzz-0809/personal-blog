<template>
  <div class="NavBarItem">
    <div id="svg-container">
      <Logo />
    </div>
    <div class="menu-container">
      <slot name="search"></slot>
      <slot name="menu"></slot>
      <el-divider direction="vertical"></el-divider>
      <slot name="profile">
        <el-dropdown class="avatar" trigger="click" @command="handleCommand">
          <el-avatar :src="$store.state.avatar" :size="45" id="avatar" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="pass">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
          <el-dialog
            width="30%"
            :visible.sync="dialogVisible"
            :show-close="false"
          >
            <span><i class="el-icon-warning"></i>&nbsp;是否要注销账号?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logout">确定</el-button>
            </span>
          </el-dialog>
        </el-dropdown>
      </slot>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/svg/Logo";
export default {
  name: "NavBarItem",
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    Logo,
  },
  methods: {
    logout() {
      this.dialogVisible = false;
      this.$store.commit("delToken");
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.dialogVisible = true;
          break;
        case "info":
          if (this.$route.path !== "/account/info")
            this.$router.push("/account/info");
          break;
        case "pass":
          if (this.$route.path !== "/account/pass")
            this.$router.push("/account/pass");
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin centerFlex() {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.NavBarItem {
  width: 100%;
  height: 100%;
  border-bottom: solid 1px #e6e6e6;
  @include centerFlex();
  user-select: none;
  #svg-container {
    height: 100%;
    width: 200px;
  }
  .menu-container {
    @include centerFlex();
    height: 100%;
    .avatar {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
li {
  text-align: center;
}
</style>