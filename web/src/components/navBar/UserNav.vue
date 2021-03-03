<template>
  <div class="UserNav">
    <NavBarItem>
      <template v-slot:menu>
        <el-menu
          id="menu"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/article">全部文章</el-menu-item>
          <el-menu-item :index="'/blog?blog_id=' + profileBlog_id"
            >关于我们</el-menu-item
          >
        </el-menu>
      </template>
      <template v-slot:profile>
        <div class="entry" v-if="!$store.state.token">
          <router-link to="/register">注册</router-link>
          <span>&nbsp;/&nbsp;</span>
          <router-link to="/login">登录</router-link>
        </div>
      </template>
    </NavBarItem>
  </div>
</template>

<script>
import NavBarItem from "@/components/navBar/NavBarItem";
import { getUserAvatar } from "@/network/user";

export default {
  name: "UserNav",
  data() {
    return {
      profileBlog_id: "fa6bd7a0-7b4a-11eb-8043-d161b6cd2ea7",
    };
  },
  components: {
    NavBarItem,
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    },
  },
  async mounted() {
    if (this.$store.state.token) {
      let res = await getUserAvatar();
      this.$store.commit("setAvatar", res.data.data.avatar);
    }
  },
};
</script>
<style lang="scss" scoped>
.UserNav {
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
  .entry {
    width: 80px;
    display: flex;
    justify-content: space-around;
    a {
      color: #909399;
      font-size: 14px;
      text-decoration: none;
    }
    a:hover {
      color: #303133;
    }
  }
}
</style>