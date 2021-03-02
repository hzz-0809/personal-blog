<template>
  <div class="blogMenu">
    <el-drawer
      :visible.sync="show"
      :with-header="false"
      direction="ltr"
      size="24%"
      @close="closeMenu"
    >
      <div class="floor"></div>
      <div class="avatar">
        <el-avatar :src="avatar"></el-avatar>
      </div>
      <div class="author-info">
        <div class="alias">
          <i class="el-icon-user-solid"></i>
          <span>昵称：{{ alias }}</span>
        </div>
        <div class="accountAge">
          <i class="el-icon-s-flag"></i>
          <span>园龄：{{ accountAge }}</span>
        </div>
        <div class="slogan">
          <i class="el-icon-chat-dot-round"></i>
          <span>标语：{{ slogan }}</span>
        </div>
      </div>
      <ul class="menu-router">
        <li @click="jump('home')">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
          <div class="line"></div>
          <span>1</span>
        </li>
        <li @click="jump('article')">
          <i class="el-icon-reading"></i>
          <span>全部文章</span>
          <div class="line"></div>
          <span>2</span>
        </li>
        <li @click="jump('github')">
          <img src="@/assets/img/icon/github.png" />
          <span>github</span>
          <div class="line"></div>
          <span>3</span>
        </li>
        <li @click="jump('gitee')">
          <img src="@/assets/img/icon/gitee.png" />
          <span>gitee</span>
          <div class="line"></div>
          <span>4</span>
        </li>
        <li @click="jump('cnblogs')">
          <img src="@/assets/img/icon/cnblogs.png" />
          <span>cnblogs</span>
          <div class="line"></div>
          <span>5</span>
        </li>
      </ul>
      <div class="nav-close">
        <el-button type="warning" round @click="show = false">关闭</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/img/EvanZhao.jpg";
export default {
  name: "BlogMenu",
  data() {
    return {
      show: false,
      avatar: defaultAvatar,
      slogan: "随便写写啊。",
      alias: "EvanZhao",
      accountAge: "元老",
    };
  },
  methods: {
    closeMenu() {
      this.$emit("visible-change", this.show);
    },
    jump(value) {
      switch (value) {
        case "home":
          this.$router.push("/");
          break;
        case "article":
          this.$router.push("/article");
          break;
        case "github":
          location.href = "https://github.com/hzz-0809";
          break;
        case "gitee":
          location.href = "https://gitee.com/hzz-0809";
          break;
        case "cnblogs":
          location.href = "https://cnblogs.com/hzz-499";
          break;
      }
    },
  },
  props: {
    menuShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    menuShow(newVal, oldVal) {
      this.show = newVal;
    },
  },
};
</script>

<style lang="scss">
.blogMenu {
  .el-drawer {
    min-width: 250px;
    max-width: 400px;
    position: relative;
    background-color: rgba(178, 222, 221, 0.3);
    color: #f5f6fa;
    .floor {
      width: 100%;
      height: 100%;
      position: absolute;
      background: url(~@/assets/img/background/blog-menu-bg.jpg) 50% 0;
      background-size: cover;
      opacity: 0.6;
      z-index: -1;
    }
    .avatar {
      margin-top: 30px;
      width: 100%;
      text-align: center;
    }
    .author-info {
      margin-top: 20px;
      padding: 0 60px;
      & > div {
        margin-top: 12px;
        font-size: 1.4rem;
      }
      i {
        padding-right: 10px;
        color: #e6a23c;
      }
    }

    .menu-router {
      margin-top: 40px;
      padding: 0 30px;
      list-style: none;
      font-size: 14px;
      li {
        padding: 10px 0;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      li:hover {
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .line {
        height: 1px;
        border-bottom: 1px dotted white;
        margin: 0 10px;
        flex-grow: 1;
      }
      img,
      i {
        padding-right: 5px;
        color: #e6a23c;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }

    .nav-close {
      margin-top: 100px;
      text-align: center;
      .el-button {
        width: 150px;
      }
    }
  }
  .el-avatar {
    width: 70px;
    height: 70px;
  }
}

@media screen and (max-width: 992px) {
  .blogMenu {
    .el-avatar {
      width: 60px;
      height: 60px;
    }
  }
}

@media screen and (min-width: 1200px) {
  .blogMenu {
    .el-drawer {
      .author-info {
        padding: 0 80px;
      }
    }
  }
}

@media screen and (min-width: 1380px) {
  .blogMenu {
    .el-drawer {
      .author-info {
        padding: 0 100px;
      }
    }
  }
}
</style>