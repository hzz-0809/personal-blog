<template>
  <el-card class="box-card LatestArticle">
    <div slot="header" class="clearfix">
      <span class="title">最新文章</span>
    </div>
    <template v-if="articles.length">
      <div class="text-container" v-for="item in articles" :key="item.id">
        <div class="text-time">
          <span class="time">
            <i class="el-icon-alarm-clock" />{{ item.create_time | formatTime }}
          </span>
          <transition name="el-zoom-in-center">
            <el-tag type="danger" size="mini" v-show="tagShow">{{
              item.tags[0].tag_name
            }}</el-tag>
          </transition>
        </div>
        <div class="text-cont">
          <router-link :to="{ path: 'blog', query: { blog_id: item.blog_id } }">
            <span><i class="el-icon-reading" />{{ item.title | bookName }}</span>
          </router-link>
        </div>
      </div>
    </template>
    <p id="blog-null-tip" v-else>暂无博文</p>
    <div class="text-more">
      <router-link to="/article"
        >更多文章<i class="el-icon-d-arrow-right"
      /></router-link>
    </div>
  </el-card>
</template>

<script>
import getLocalTime from "@/utils/getLocalTime";
export default {
  name: "LatestArticle",
  data() {
    return {
      tagShow: false,
      article: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.tagShow = true;
      }, 1000);
    });
  },
  filters: {
    bookName(value) {
      if (!value) return "";
      return `《${value}》`;
    },
    formatTime(value) {
      return getLocalTime(value);
    },
  },
  props: {
    articles: Array,
  },
};
</script>

<style lang="scss">
.el-card.LatestArticle {
  position: relative;
  font-size: 1.6rem;
  background: url(~@/assets/img/background/home-bg.jpg);
  background-size: cover;
  .title {
    font-family: myFont, "隶书", "楷体";
    font-size: 2.4rem;
  }
  .el-card__header {
    padding-top: 1.8rem;
    padding-bottom: 1.8rem;
    border-bottom: 1px solid #b2bec3;
  }
  .el-card__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .text-container {
    border-bottom: 1px dashed #b2bec3;
    i {
      padding-right: 5px;
    }
    .text-time {
      padding: 1rem 0;
      font-family: myFont;
      display: flex;
      justify-content: space-between;
      .time {
        display: block;
        height: 20px;
        line-height: 20px;
        font-weight: 700;
      }
      .el-tag {
        min-width: 60px;
        text-align: center;
      }
    }

    .text-cont {
      font-family: Georgia, serif;
      font-size: 1.5rem;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 1rem;
      a {
        text-decoration: none;
        color: #303130;
      }
      span:hover {
        color: #f56c6c;
      }
    }
  }
  #blog-null-tip {
    margin-top: 100px;
    text-align: center;
    font-size: 2.2rem;
    color: #909399;
  }

  .text-more {
    position: absolute;
    right: 20px;
    bottom: 20px;
    a {
      font-family: myFont;
      font-size: 1.8rem;
      text-decoration: none;
      color: #636e72;
    }
    a:hover {
      color: black;
    }
  }
}
</style>