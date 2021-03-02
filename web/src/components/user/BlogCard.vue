<template>
  <div class="BlogCard">
    <el-card
      class="article-card-item"
      v-for="(item, index) in blog_arr"
      :key="item.blog_id"
      :body-style="{ padding: 0 }"
    >
      <div class="blog-img">
        <img :src="blogImgArr[index]" v-if="imgShow" />
      </div>
      <div class="floor">
        <div class="blog-title">标题：{{ item.title }}</div>
        <div class="blog-tags">
          <span><i class="el-icon-price-tag"></i>&nbsp;标签：</span>
          <el-tag
            effect="dark"
            size="mini"
            v-for="tag in item.tags"
            :type="tag.tag_type | matchType"
            :key="tag.tag_name"
          >
            {{ tag.tag_name }}
          </el-tag>
        </div>
        <div class="blog-enter">
          <el-button type="primary" size="mini" @click="jumpBLog(item.blog_id)"
            >进入博文</el-button
          >
        </div>
        <div class="blog-status">
          <div class="favor item">
            <img src="@/assets/img/icon/favor-status.png" alt="" />
            <span>{{ item.favor | exceed }}</span>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="comment item">
            <i class="el-icon-s-comment"></i>
            <span>{{ item.commentNum | exceed }}</span>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="view item">
            <i class="el-icon-view"></i>
            <span>{{ view }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import blog_bg1 from "@/assets/img/background/blog_bg.webp";
import blog_bg2 from "@/assets/img/background/blog_bg2.webp";
import blog_bg3 from "@/assets/img/background/blog_bg3.webp";
import matchTag from "@/utils/matchTag";
export default {
  name: "BlogCard",
  data() {
    return {
      blog_bg: [blog_bg1, blog_bg2, blog_bg3],
      blogImgArr: [],
      blog_arr: [],
      favor: 1000,
      comment: 988,
      view: "-",
      imgShow: true,
    };
  },
  methods: {
    jumpBLog(blog_id) {
      this.$router.push({
        path: "/blog",
        query: { blog_id },
      });
    },
    randomImg(blogTotal) {
      for (let i = 0; i < blogTotal; i++) {
        this.blogImgArr[i] = this.blog_bg[
          Math.floor(Math.random() * this.blog_bg.length)
        ];
      }
    },
  },
  watch: {
    blogs(val) {
      this.blog_arr = val;
      this.randomImg(val.length);
    },
  },
  computed: {},
  filters: {
    exceed(val) {
      if (val > 999) return "999+";
      else return val;
    },
    matchType(val) {
      return matchTag(val);
    },
  },
  props: {
    blogs: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
$contPadding: 10px;
.BlogCard {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &:after {
    content: "";
    width: 300px;
    margin: 20px;
  }
  .article-card-item {
    width: 300px;
    margin: 20px;
    &:hover .blog-img > img {
      transform: scale(2);
    }
    .floor {
      padding: $contPadding;
    }
    .blog-img {
      overflow: hidden;
      img {
        width: 100%;
        transition: transform 1s ease;
      }
    }
    .blog-title {
      margin-bottom: 10px;
      width: 100%;
      font-size: 2.4rem;
      font-family: myFont;
      box-sizing: border-box;
      white-space: nowrap; //强制文本不能换行
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .blog-tags {
      margin-bottom: 10px;
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      display: flex;
      align-items: center;
      span {
        font-family: myFont;
        font-size: 14px;
      }
      .el-tag {
        margin-left: 10px;
        max-width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .blog-enter {
      margin-bottom: 20px;
      text-align: center;
      .el-button {
        width: 100%;
      }
    }
    .blog-status {
      display: flex;
      .el-divider {
        height: 20px;
      }
      .item {
        height: 20px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      i {
        font-size: 16px;
      }
      span {
        font-size: 14px;
        margin-left: 10px;
        font-family: Georgia, sans-serif;
      }
      img {
        width: 16px;
        height: 16px;
        margin-top: -4px;
      }
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .BlogCard {
    justify-content: space-around;
  }
}
@media screen and (max-width: 992px) {
  .BlogCard {
    justify-content: space-around;
    .article-card-item {
      width: 400px;

      .floor {
        padding: $contPadding 30px;
      }
      .blog-tags > .el-tag {
        max-width: 120px;
      }
    }
  }
}
</style>