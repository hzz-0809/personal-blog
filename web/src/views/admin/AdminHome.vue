<template>
  <div class="adminHome">
    <AsideMenu>
      <template v-slot:el-menu-item-top>
        <el-menu-item index="/hzz/add">
          <i class="el-icon-edit"></i>
          <span slot="title">添加博文</span>
        </el-menu-item>
      </template>
      <template v-slot:el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">管理博文</span>
          </template>
          <el-menu-item @click="$message('抱歉，功能尚未开放')" index="/hzz/1"
            >查看博文</el-menu-item
          >
          <el-menu-item @click="$message('抱歉，功能尚未开放')" index="/hzz/2"
            >删除博文</el-menu-item
          >
          <el-menu-item @click="$message('抱歉，功能尚未开放')" index="/hzz/3"
            >修改标签</el-menu-item
          >
        </el-submenu>
      </template>
    </AsideMenu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AsideMenu from "@/components/navBar/AsideMenu";
export default {
  name: "AdminHome",
  components: {
    AsideMenu,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.adminHome {
  display: flex;
  & > .content {
    width: 80%;
    max-width: 1200px;
    margin-left: 80px;
  }
}
</style>