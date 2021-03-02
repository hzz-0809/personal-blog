<template>
  <el-card class="About">
    <div slot="header" class="clearfix">
      <span class="title">本站数据</span>
    </div>
    <div class="about-content">
      <div class="profile">
        <el-avatar :size="50" :src="avatar"></el-avatar>
        <div class="about-data">
          <div class="articleNum">文章：{{ about.articleNum }}</div>
          <div class="fovarNum">获赞：{{ about.favorNum }}</div>
          <div class="commentNum">留言：{{ about.commentNum }}</div>
        </div>
      </div>
      <div class="echarts-body">
        <Bar
          :about="about"
          v-if="about.articleNum && about.commentNum && about.favorNum"
        ></Bar>
      </div>
    </div>
  </el-card>
</template>

<script>
import Bar from "@/components/echarts/Bar";
import Pie from "@/components/echarts/Pie";
import defaultAvatar from "@/assets/img/EvanZhao.jpg";
export default {
  name: "About",
  data() {
    return {
      avatar: defaultAvatar,
    };
  },
  components: {
    Bar,
    Pie,
  },
  props: {
    about: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.About {
  width: 85%;
  max-width: 1500px;
  margin: 20px auto 0;
  background: url(~@/assets/img/background/about-bg.jpg);
  background-size: cover;
  .title {
    font-size: 2.4rem;
    font-family: myFont;
  }
  .about-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .about-data {
    font-size: 1.6rem;
    font-family: Georgia, serif;
    margin-top: 5px;
    div {
      padding: 5px 5px;
    }
  }
}

@media screen and (max-width: 992px) {
  .About {
    .about-content {
      display: block;
    }
    .profile {
      display: flex;
      justify-content: center;
    }
    .el-avatar,
    .el-avatar img {
      width: 40px !important;
      height: 40px !important;
    }
    .about-data {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .echarts-body {
      .Bar {
        margin: 0 auto 0;
      }
    }
  }
}
</style>