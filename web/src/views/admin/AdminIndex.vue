<template>
  <el-container class="adminIndex">
    <el-header>
      <AdminNav></AdminNav>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="80px">
      <div class="copyright">
        Copyright&nbsp;&copy;&nbsp;2020-2021&nbsp;EvanZhao
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import AdminNav from "@/components/navBar/AdminNav";
import AdminHome from "@/views/admin/AdminHome";
export default {
  name: "AdminIndex",
  components: {
    AdminNav,
    AdminHome,
  },
};
</script>

<style lang="scss" scoped>
.el-main,
.el-header {
  padding: 0 8%;
}
.el-main {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.el-footer {
  width: 100%;
  background: #718093;
  .copyright {
    height: 80px;
    color: white;
    font-size: 14px;
    text-align: center;
    line-height: 80px;
  }
}
</style>