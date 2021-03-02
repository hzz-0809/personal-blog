<template>
  <el-card class="CommentEditor">
    <div slot="header">发表评论<i class="el-icon-edit"></i></div>
    <div id="editor"></div>
    <div class="publishButton">
      <el-button type="primary" size="medium" @click="clear">清空</el-button>
      <el-button
        class="publish-button"
        :type="button.publish.type"
        :disabled="button.publish.disabled"
        :loading="button.publish.loading"
        size="medium"
        @click="publishComment"
        >{{ button.publish.text }}</el-button
      >
    </div>
    <div class="spokesman">
      <span>发表人：{{ userAlias }}</span>
    </div>
  </el-card>
</template>

<script>
import { btnLoading, btnLoadingClose } from "@/utils/loading";
import { addComment } from "@/network/user";
import E from "wangeditor";
export default {
  name: "CommentEditor",
  data() {
    return {
      editor: null,
      button: {
        publish: {
          text: "提交评论",
          type: "primary",
          loading: false,
          disabled: false,
        },
      },
    };
  },
  methods: {
    createEditor() {
      this.editor = new E("#editor");
      const editor = this.editor;
      //配置
      editor.config.height = 200;
      editor.config.zIndex = 1;
      editor.config.placeholder = "文明发言，请注意言词";
      // 配置菜单栏，删减菜单，调整顺序
      editor.config.menus = [
        "bold",
        "italic",
        "underline",
        "foreColor",
        "link",
        "emoticon",
        "undo",
        "redo",
      ];
      editor.config.showFullScreen = false;
      editor.create();
    },
    clear() {
      this.editor.txt.clear();
    },
    async publishComment() {
      let blog_id = this.$route.query.blog_id;
      let content = this.editor.txt.html();
      if (content === "") {
        this.$notify({
          title: "警告",
          message: "您没有写评论哦！",
          type: "warning",
        });
        return;
      }
      //button loading
      btnLoading(this.button.publish);
      let res = await addComment({ blog_id, content });
      //close button loading
      btnLoadingClose(this.button.publish, "提交评论");

      if (res.data.status) {
        this.$notify({
          title: "成功",
          message: res.data.msg,
          type: "success",
        });
      }
      //清空留言框
      this.clear();
    },
  },
  mounted() {
    this.createEditor();
  },
  props: {
    userAlias: String,
  },
};
</script>

<style lang="scss">
.CommentEditor {
  position: relative;
  .el-card__header {
    font-family: myFont;
    font-size: 2.2rem;
    font-weight: 500;
    i {
      font-size: 1.8rem;
      padding: 0 10px;
    }
  }
  #editor {
    font-size: 1.4rem;
    & > div {
      transition: border-color 0.7s;
    }
    &:hover > div {
      border-color: #2980b9 !important;
    }
  }
  .publishButton {
    margin-top: 20px;
    text-align: right;
  }
  .spokesman {
    position: absolute;
    bottom: 30px;
    left: 30px;
    font-size: 12px;
    color: #95a5a6;
  }

  .publish-button {
    width: 100px;
  }
}
</style>