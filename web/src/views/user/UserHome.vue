<template>
  <div class="UserHome">
    <div class="first-row">
      <div class="svg-home-container">
        <HomeSVG />
      </div>
      <LatestArticle :articles="articles" />
    </div>
    <div class="second-row">
      <About :about="about" />
    </div>
    <div class="third-row">
      <el-divider>最新留言</el-divider>
      <div class="comment-container">
        <Comment
          :comments="comments"
          :behavior="commentsBehavior"
          :titleShow="true"
        ></Comment>
      </div>
      <p id="comment-full-tip" v-if="comments.length === commentLimit">
        最多显示最近{{ commentLimit }}条留言
      </p>
    </div>
  </div>
</template>

<script>
import HomeSVG from "@/components/svg/HomeSVG";
import LatestArticle from "@/components/user/LatestArticle";
import Comment from "@/components/user/Comment";
import About from "@/components/user/About";
import { getIndexData, getCommentsBehavior } from "@/network/user";

export default {
  name: "UserHome",
  data() {
    return {
      articles: [],
      about: {},
      comments: [],
      commentsBehavior: [],
      blogLimit: 5,
      commentLimit: 10,
    };
  },
  components: {
    HomeSVG,
    LatestArticle,
    Comment,
    About,
  },
  methods: {
    async getCommentsBehavior() {
      let comment_id_arr = [];
      this.comments.forEach((item) => comment_id_arr.push(item.comment_id));
      let res = await getCommentsBehavior({ comment_id_arr });
      this.commentsBehavior = res.data.data.commentsBehavior;
    },
    async getIndexData() {
      //非登录状态下
      let blogLimit = this.blogLimit;
      let commentLimit = this.commentLimit;
      let res = await getIndexData({ blogLimit, commentLimit });
      this.articles = res.data.data.articles;
      this.about = res.data.data.about;
      this.comments = res.data.data.comments;

      //登录状态
      if (this.$store.state.token) {
        this.getCommentsBehavior();
      }
    },
  },
  async mounted() {
    this.getIndexData();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/userStyle/userHome.scss";
</style>