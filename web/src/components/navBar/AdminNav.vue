<template>
  <div class="adminNav">
    <NavBarItem>
      <template v-slot:menu>
        <el-menu
          id="menu"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="/hzz/add">我的博文</el-menu-item>
        </el-menu>
      </template>
      <template v-slot:profile>
        <el-dropdown class="avatar" trigger="click" @command="handleCommand">
          <el-avatar :src="avatar_url" :size="45" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出账号</el-dropdown-item>
          </el-dropdown-menu>
          <el-dialog
            width="30%"
            :visible.sync="dialogVisible"
            :show-close="false"
          >
            <span
              ><i class="el-icon-warning"></i>&nbsp;是否要退出管理员账号?</span
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="logout">确定</el-button>
            </span>
          </el-dialog>
        </el-dropdown>
      </template>
    </NavBarItem>
  </div>
</template>

<script>
import NavBarItem from "@/components/navBar/NavBarItem";
import EvanZhao from "@/assets/img/EvanZhao.jpg";
export default {
  name: "AdminNav",
  components: {
    NavBarItem,
  },
  data() {
    return {
      dialogVisible: false,
      avatar_url: EvanZhao,
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    },
  },
  methods: {
    logout() {
      this.dialogVisible = false;
      localStorage.removeItem("adminToken");
      this.$router.push("/hzz/login");
    },
    handleCommand(command) {
      if (command === "logout") {
        this.dialogVisible = true;
      }
    },
  },
  mounted() {
    this.$store.commit("setAvatar", EvanZhao);
  },
};
</script>
<style lang="scss" scoped>
.adminNav {
  width: 100%;
  height: 70px;
  #menu {
    border: none;
    height: 100%;
    li {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>