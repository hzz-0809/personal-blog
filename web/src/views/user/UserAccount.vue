<template>
  <div class="UserAccount">
    <AsideMenu>
      <template v-slot:el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/account/info">基本信息</el-menu-item>
          <el-menu-item index="/account/avatar">修改头像</el-menu-item>
          <el-menu-item index="/account/pass">修改密码</el-menu-item>
        </el-submenu>
      </template>
      <template v-slot:el-menu-item-bottom>
        <el-menu-item @click="$message('抱歉，功能尚未开放')">
          <i class="el-icon-view"></i>
          <span slot="title">浏览记录</span>
        </el-menu-item>
      </template>
    </AsideMenu>
    <div class="content">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>
<script>
import AsideMenu from "@/components/navBar/AsideMenu";
export default {
  name: "UserAccount",
  components: {
    AsideMenu,
  },
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制组件是否显示
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss">
.UserAccount {
  display: flex;
  min-height: 500px;
  .content {
    width: 100%;
    margin: 0 100px;
  }
}
@media screen and (max-width: 768px) {
  .UserAccount {
    .content {
      width: 100%;
      margin: 0 40px;
    }
  }
}
</style>