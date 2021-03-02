<template>
  <div class="blogEditor"></div>
</template>

<script>
import E from "wangeditor";
import "highlight.js/styles/googlecode.css";
import hljs from "highlight.js";

export default {
  name: "BlogEditor",
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    createEditor() {
      this.editor = new E(".blogEditor");
      const editor = this.editor;
      //配置
      editor.config.height = 600;
      editor.highlight = hljs; //代码高亮
      editor.config.uploadImgShowBase64 = true; //base64保存图片
      editor.config.showLinkImg = false; //隐藏网络图片上传功能
      editor.config.excludeMenus = ["video"]; //剔除菜单栏选项
      editor.config.languageType = [
        "JavaScript",
        "TypeScript",
        "Html",
        "CSS",
        "JSON",
        "XML",
        "Python",
        "Java",
        "SQL",
        "Markdown",
        "Shell Session",
      ]; //配置代码语言
      editor.create();
    },
  },
  mounted() {
    this.createEditor();
  },
};
</script>

<style lang="scss">
.blogEditor {
  position: relative;
  z-index: 0;
  font-size: 16px;
  .w-e-toolbar {
    font-size: 12px;
  }
}
</style>