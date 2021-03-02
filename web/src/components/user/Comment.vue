<template>
  <div class="Comment">
    <template v-if="commentArr.length">
      <div
        class="comment-body"
        v-for="(item, index) in commentArr"
        :key="item.comment_id"
      >
        <el-avatar :size="50" :src="item.user.avatar"></el-avatar>
        <div class="timestamp">
          {{ item.create_time | formatTime }}
        </div>
        <el-card>
          <div slot="header" class="clearfix comment-title">
            <span class="user">{{ item.user | username }}</span>
            <template v-if="titleShow">
              <span>&nbsp;在</span>
              <router-link
                :to="{
                  path: '/blog',
                  query: { blog_id: item.blog.blog_id },
                }"
                class="title"
                >{{ item.blog.title | bookName }}</router-link
              >
            </template>
            <span>留言：</span>
          </div>
          <Output :content="item.content" class="content"></Output>
          <div class="comment-tools">
            <div class="favor">
              <div class="favor-event" @click="favorComment(index)">
                <img
                  src="@/assets/img/comment/favor-before.png"
                  alt="点赞"
                  title="点赞"
                  v-if="!afterShow.favors[index]"
                />
                <img
                  src="@/assets/img/comment/favor-after.png"
                  alt="点赞"
                  title="点赞"
                  v-else
                />
              </div>
              <span>&nbsp;{{ item.favor }}</span>
            </div>
            <div class="opposition">
              <div class="opposition-event" @click="oppositionComment(index)">
                <img
                  src="@/assets/img/comment/opposition-before.png"
                  alt="踩"
                  title="踩"
                  v-if="!afterShow.oppositions[index]"
                />
                <img
                  src="@/assets/img/comment/opposition-after.png"
                  alt="踩"
                  title="踩"
                  v-else
                />
              </div>

              <span>&nbsp;{{ item.opposition }}</span>
            </div>
            <div
              class="reply"
              @mouseover="changeStatus(index)"
              @mouseout="changeStatus(index)"
            >
              <img
                src="@/assets/img/comment/reply-hover.png"
                alt="回复"
                title="回复"
                @click="tip"
                v-if="replyIndex === index && replyStatus"
              />
              <img
                src="@/assets/img/comment/reply-default.png"
                alt="回复"
                title="回复"
                v-else
              />
            </div>
          </div>
        </el-card>
      </div>
    </template>
    <el-card id="comment-null" v-else>
      <i class="el-icon-error"></i>目前暂无评论，期待你的评论哦~&nbsp;&nbsp;^_^
    </el-card>
  </div>
</template>

<script>
import getLocalTime from "@/utils/getLocalTime";
import Output from "@/components/editor/Output";
import { putCommentFavor, putCommentOpposition } from "@/network/user";
export default {
  name: "Comment",
  data() {
    return {
      replyIndex: -1,
      replyStatus: false,
      commentArr: [],
      afterShow: {
        favors: [],
        oppositions: [],
      },
    };
  },
  components: {
    Output,
  },
  watch: {
    comments(val) {
      this.commentArr = val;
    },
    behavior(newArr) {
      this.afterShow.favors = [];
      this.afterShow.oppositions = [];
      newArr.forEach((item) => {
        if (item.userBehavior === 1) {
          this.afterShow.favors.push(true);
          this.afterShow.oppositions.push(false);
        } else if (item.userBehavior === 2) {
          this.afterShow.favors.push(false);
          this.afterShow.oppositions.push(true);
        } else {
          this.afterShow.favors.push(false);
          this.afterShow.oppositions.push(false);
        }
      });
    },
  },
  filters: {
    bookName(value) {
      if (!value) return "";
      return `《${value}》`;
    },
    formatTime(value) {
      return getLocalTime(value);
    },
    username(user) {
      if (user.alias) return user.alias;
      else return user.username;
    },
  },
  methods: {
    async favorComment(index) {
      let comment_id = this.commentArr[index].comment_id;
      let res = await putCommentFavor({ comment_id });
      switch (res.data.data.flag) {
        case -1:
          this.commentArr[index].favor -= 1;
          this.afterShow.favors[index] = false;
          break;
        case 1:
          this.commentArr[index].favor += 1;
          this.afterShow.favors[index] = true;
          if (this.afterShow.oppositions[index]) {
            this.afterShow.oppositions[index] = false;
            this.commentArr[index].opposition -= 1;
          }
          break;
        case 0:
          break;
      }
    },
    async oppositionComment(index) {
      let comment_id = this.commentArr[index].comment_id;
      let res = await putCommentOpposition({ comment_id });
      switch (res.data.data.flag) {
        case -1:
          this.commentArr[index].opposition -= 1;
          this.afterShow.oppositions[index] = false;
          break;
        case 1:
          this.commentArr[index].opposition += 1;
          this.afterShow.oppositions[index] = true;
          if (this.afterShow.favors[index]) {
            this.afterShow.favors[index] = false;
            this.commentArr[index].favor -= 1;
          }
          break;
        case 0:
          break;
      }
    },
    changeStatus(index) {
      this.replyIndex = index;
      this.replyStatus = !this.replyStatus;
    },
    tip() {
      this.$message({
        message: "回复功能尚未开发！",
        type: "warning",
      });
    },
  },
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
    titleShow: {
      type: Boolean,
      default: false,
    },
    behavior: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.Comment {
  width: 100%;
  max-width: 1500px;
  margin: 20px auto 20px;
  .el-card {
    background: url(~@/assets/img/background/comment-bg.jpg);
    background-size: cover;
  }
  .comment-body {
    position: relative;
    padding: 30px 0 0 80px;
    margin-bottom: 40px;
    .el-avatar {
      position: absolute;
      left: 15px;
      top: 0;
    }
    .timestamp {
      position: absolute;
      top: 0;
      font-size: 1.8rem;
      font-family: myFont;
      font-weight: 700;
    }
  }

  .el-card__header {
    padding-top: 1.8rem;
    padding-bottom: 1.8rem;
    .comment-title {
      font-size: 1.6rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .user {
        padding-right: 8px;
      }
    }
    .title {
      display: block;
      max-width: 270px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #909399;
    }
    .title:hover {
      color: #e6a23c;
    }
  }
  .el-card__body {
    position: relative;
    padding-bottom: 50px;
    padding-top: 10px;
    .content {
      padding: 0;
    }
    .comment-tools {
      height: 20px;
      position: absolute;
      bottom: 20px;
      right: 40px;
      display: flex;
      align-items: center;
      user-select: none;
      & > div {
        height: 100%;
        padding: 0 0.4rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .opposition-event,
      .favor-event {
        margin-right: 0.6rem;
      }
      .opposition img {
        transform: translateY(0.3rem);
      }
      .reply > img {
        transform: translateY(-0.2rem);
      }
      span {
        font-size: 1.4rem;
        font-family: Georgia, serif;
      }
      img {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }
    }
  }
  #comment-null {
    font-size: 1.6rem;
    .el-card__body {
      padding: 20px;
    }
    i {
      color: #f56c6c;
      padding-right: 10px;
    }
  }
}
</style>