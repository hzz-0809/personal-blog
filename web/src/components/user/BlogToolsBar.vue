<template>
  <div class="BlogToolsBar">
    <el-tooltip :content="favorNum.toString()" placement="left">
      <div
        class="toolItem favor"
        :style="{ lineHeight: 48 + 'px' }"
        @click="favorBlog"
      >
        <img
          src="@/assets/img/comment/favor-before.png"
          v-if="!afterShow.favor"
        />
        <img src="@/assets/img/comment/favor-after.png" v-else />
      </div>
    </el-tooltip>
    <el-tooltip :content="oppositionNum.toString()" placement="left">
      <div
        class="toolItem opposition"
        :style="{ lineHeight: 50 + 'px' }"
        @click="oppositionBlog"
      >
        <img
          src="@/assets/img/comment/opposition-before.png"
          v-if="!afterShow.opposition"
        />
        <img src="@/assets/img/comment/opposition-after.png" v-else />
      </div>
    </el-tooltip>
    <el-tooltip content="收藏博文" placement="left">
      <div class="toolItem collect" @click="message">
        <i class="el-icon-star-on"></i>
      </div>
    </el-tooltip>
    <el-backtop :bottom="160" :right="30" :visibility-height="300"></el-backtop>
  </div>
</template>

<script>
import { putBlogFavor, putBlogOpposition } from "@/network/user";
export default {
  name: "BlogToolsBar",
  data() {
    return {
      favorNum: this.favor,
      oppositionNum: this.opposition,
      afterShow: {
        favor: false,
        opposition: false,
      },
    };
  },
  watch: {
    favor(val) {
      this.favorNum = val;
    },
    opposition(val) {
      this.oppositionNum = val;
    },
    blogBehavior(val) {
      if (val === 1) this.afterShow.favor = true;
      else this.afterShow.favor = false;
      if (val === 2) this.afterShow.opposition = true;
      else this.afterShow.opposition = false;
    },
  },
  methods: {
    backTop() {
      location.href = "#top";
    },
    message() {
      this.$message({ message: "抱歉，功能尚未开放！", type: "warning" });
    },
    async favorBlog() {
      let blog_id = this.$route.query.blog_id;
      let res = await putBlogFavor({ blog_id });
      switch (res.data.data.flag) {
        case -1:
          this.favorNum -= 1;
          this.afterShow.favor = false;
          break;
        case 1:
          this.favorNum += 1;
          this.afterShow.favor = true;
          if (this.afterShow.opposition) {
            this.afterShow.opposition = false;
            this.oppositionNum -= 1;
          }
          break;
        case 0:
          break;
      }
    },
    async oppositionBlog() {
      let blog_id = this.$route.query.blog_id;
      let res = await putBlogOpposition({ blog_id });
      switch (res.data.data.flag) {
        case -1:
          this.oppositionNum -= 1;
          this.afterShow.opposition = false;
          break;
        case 1:
          this.oppositionNum += 1;
          this.afterShow.opposition = true;
          if (this.afterShow.favor) {
            this.afterShow.favor = false;
            this.favorNum -= 1;
          }
          break;
        case 0:
          break;
      }
    },
  },
  props: {
    favor: {
      type: Number,
      default: 0,
    },
    opposition: {
      type: Number,
      default: 0,
    },
    blogBehavior: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(45deg);
  }
  40% {
    transform: rotate(-45deg);
  }
  60% {
    transform: rotate(30deg);
  }
  80% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.BlogToolsBar {
  position: fixed;
  right: 30px;
  bottom: 200px;
  .toolItem {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 42px;
    border-radius: 50%;
    background: white;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
    i {
      font-size: 18px;
    }
  }
  .favor:hover img,
  .opposition:hover img,
  .collect:hover i {
    animation: swing 1.5s;
  }
  .collect:hover {
    color: #e6a23c;
  }
}
</style>