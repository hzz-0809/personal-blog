<template>
  <el-container>
    <el-header height="70px">
      <UserNav />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="240px">
      <Footer />
    </el-footer>
    <el-backtop :bottom="250" :right="50"></el-backtop>
  </el-container>
</template>

<script>
// @ is an alias to /src
import UserNav from "@/components/navBar/UserNav";
import Footer from "@/components/user/Footer";

export default {
  name: "UserIndex",
  components: {
    UserNav,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.el-main,
.el-header {
  padding: 0 8%;
}
.el-footer {
  padding: 0;
  width: 100%;
}

.el-main {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  box-sizing: border-box;
  min-height: 500px;
}
</style>