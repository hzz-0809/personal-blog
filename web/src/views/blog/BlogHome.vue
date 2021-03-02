<template>
  <div class="blogHome">
    <!-- 菜单按钮 -->
    <div class="blog-menu-button" @click="menuShow = true" v-if="menuBtnShow">
      <i class="el-icon-menu"></i>
      <span>MENU</span>
    </div>
    <div class="blog-menu-button-circle" @click="menuShow = true" v-else>
      <i class="el-icon-menu"></i>
    </div>
    <!-- 菜单 -->
    <BlogMenu :menuShow="menuShow" @visible-change="visibleChange"></BlogMenu>
    <!-- blog header -->
    <div class="blogHome-header">
      <vue-particles
        color="#dff9fb"
        linesColor="#dff9fb"
        :particleOpacity="0.8"
        :particlesNumber="60"
        :linesWidth="2"
      ></vue-particles>
      <div class="blog-title">{{ blog.title }}</div>
      <div class="blog-describe">
        <div class="publish_time">
          <i class="el-icon-alarm-clock"></i>
          <span>发表于&nbsp;{{ blog.create_time }}</span>
        </div>
        <div class="comment_num">
          <i class="el-icon-chat-dot-round"></i>
          <span>评论&nbsp;{{ blog.comment_num }}</span>
        </div>
        <div class="view_num">
          <i class="el-icon-view"></i>
          <span>浏览&nbsp;{{ blog.view_num }}</span>
        </div>
        <div class="collection_num">
          <i class="el-icon-star-off"></i>
          <span>收藏&nbsp;{{ blog.collenction_num }}</span>
        </div>
      </div>
      <div class="blog-tag">
        <el-tag
          v-for="item in blog.tags"
          :key="item.type"
          :type="item.tag_type | tagType"
          effect="dark"
        >
          {{ item.tag_name }}
        </el-tag>
      </div>
      <div class="author-signature">
        <span>作者：</span>
        <Signature color="#fff" :width="120" :height="60"></Signature>
      </div>
    </div>
    <!-- blog content -->
    <el-card class="blogHome-content">
      <Output :content="blog.content"></Output>
      <p class="end">__END__</p>
    </el-card>
    <!-- blog comment -->
    <div class="blogHome-comment" v-if="$store.state.token">
      <CommentEditer :userAlias="userAlias"></CommentEditer>
      <el-divider><i class="el-icon-chat-line-round"></i>博文留言</el-divider>
      <Comment :comments="comments" :behavior="commentsBehavior"></Comment>
      <div id="loadAll">
        <el-button
          type="primary"
          size="small"
          @click="getAllComments"
          v-if="comments.length === commentLimit"
          >加载全部评论</el-button
        >
      </div>
    </div>
    <el-card class="blogHome-comment-tip" v-else>
      <i class="el-icon-warning"></i>
      <p>
        登录后才能发表和查看留言，立即&nbsp;<router-link to="login"
          >登录</router-link
        >&nbsp;或&nbsp;<router-link to="/register">注册</router-link
        >，&nbsp;<router-link to="/">访问</router-link>&nbsp;网站首页。
      </p>
    </el-card>
    <!-- blog footer -->
    <Footer></Footer>
    <!-- blog tools bar-->
    <BlogToolsBar
      :favor="blog.favor"
      :opposition="blog.opposition"
      :blogBehavior="blogBehavior"
    ></BlogToolsBar>
    <ColouredRibbon></ColouredRibbon>
  </div>
</template>

<script>
import Footer from "@/components/user/Footer";
import BlogMenu from "@/components/navBar/BlogMenu";
import Output from "@/components/editor/Output";
import {
  getBlog,
  getUserInfo,
  getBlogComments,
  getBlogBehavior,
  getCommentsBehavior,
} from "@/network/user";
import getLocalTime from "@/utils/getLocalTime";
import Signature from "@/components/svg/Signature";
import matchTag from "@/utils/matchTag";
import CommentEditer from "@/components/editor/CommentEditer";
import Comment from "@/components/user/Comment";
import BlogToolsBar from "@/components/user/BlogToolsBar";
import ColouredRibbon from "@/components/svg/ColouredRibbon";
export default {
  name: "blogHome",
  components: {
    Footer,
    BlogMenu,
    Output,
    Signature,
    CommentEditer,
    Comment,
    BlogToolsBar,
    ColouredRibbon,
  },
  data() {
    return {
      menuShow: false, //menu是否弹出
      menuBtnShow: true, //决定menu button的显示方式
      blog: {
        title: "",
        create_time: "",
        comment_num: 5000,
        view_num: "-",
        collenction_num: "-",
        content: "",
        favor: 0,
        opposition: 0,
        tags: [],
      },
      comments: [],
      userAlias: "",
      blogBehavior: 0,
      commentsBehavior: [],
      commentLimit: 5,
    };
  },
  filters: {
    tagType(value) {
      return matchTag(value);
    },
  },
  methods: {
    async getBlogData() {
      let blog_id = this.$route.query.blog_id;
      let res = await getBlog({ blog_id });
      this.blog.title = res.data.data.title;
      this.blog.content = res.data.data.content;
      this.blog.create_time = getLocalTime(res.data.data.create_time);
      this.blog.tags = res.data.data.tags;
      this.blog.opposition = res.data.data.opposition;
      this.blog.favor = res.data.data.favor;
    },
    async getUserData() {
      let res = await getUserInfo();
      let alias = res.data.data.alias;
      let username = res.data.data.username;

      //获取用户的显示昵称
      if (alias) this.userAlias = alias;
      else this.userAlias = username;
    },
    async getLimitComments() {
      let blog_id = this.$route.query.blog_id;
      let limit = this.commentLimit;
      let res = await getBlogComments({ blog_id, limit });
      this.comments = res.data.data.comments;
      this.getCommentsBehavior();
    },
    async getAllComments() {
      let blog_id = this.$route.query.blog_id;
      let limit = 0;
      let res = await getBlogComments({ blog_id, limit });
      this.comments = res.data.data.comments;
      this.getCommentsBehavior();
    },
    async getBlogBehavior() {
      let blog_id = this.$route.query.blog_id;
      let res = await getBlogBehavior({ blog_id });
      this.blogBehavior = res.data.data.blogBehavior;
    },
    async getCommentsBehavior() {
      let comment_id_arr = [];
      this.comments.forEach((item) => comment_id_arr.push(item.comment_id));
      let res = await getCommentsBehavior({ comment_id_arr });
      this.commentsBehavior = res.data.data.commentsBehavior;
    },
    visibleChange(value) {
      this.menuShow = value;
    },
    sortTags() {
      this.blog.tags.sort((a, b) => a.type - b.type);
    },
  },
  mounted() {
    //滚动监听
    this.$nextTick(() => {
      let menuBtn = document.getElementsByClassName("blog-menu-button")[0];
      window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop >= 300 - menuBtn.offsetHeight) {
          this.menuBtnShow = false;
        } else {
          this.menuBtnShow = true;
        }
      });
    });

    //非登录状态下也可获取
    this.getBlogData();
    this.sortTags();

    //仅登录状态下获取
    //TODO http请求合并
    //遗留问题，这里的http请求过多了，影响性能
    //优化：将登录状态下的请求合成一个，统一发送，
    //本人没时间了，加上这破网站也就这样，应该没什么浏览，所以就先这样
    if (this.$store.state.token) {
      this.getUserData();
      this.getBlogBehavior();
      this.getLimitComments();
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/blogStyle/blogHome.scss";

@media screen and (max-width: 992px) {
  .blogHome {
    .blog-title {
      font-size: 26px;
    }
    .blog-describe {
      font-size: 14px;
    }
  }
}
</style>