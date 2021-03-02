<template>
  <div class="adminPublish" v-if="isShow">
    <div class="title-box">
      <label for="blogTitle" class="label">博文标题：</label>
      <el-input
        placeholder="请输入博文标题"
        v-model="title"
        maxlength="30"
        size="medium"
        show-word-limit
        id="blogTitle"
      ></el-input>
      <span class="describe"><i>*&nbsp;标题不宜过长，不需要添加《》</i></span>
    </div>
    <div class="tag-box">
      <div class="label">博文标签：</div>
      <el-tag
        v-for="(tag, index) in dynamicTags"
        :key="index"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        :type="tag.tag_type | tagType"
      >
        {{ tag.tag_name }}
      </el-tag>
      <el-autocomplete
        class="inline-input input-new-tag"
        v-model="inputValue"
        v-if="inputVisible"
        ref="saveTagInput"
        size="small"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        @keyup.enter.native="handleInputConfirm"
        :clearable="true"
      ></el-autocomplete>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        +&nbsp;添加新标签</el-button
      >
      <el-button
        :type="tagBtn[0].type"
        size="small"
        class="tagConfirm"
        @click="handleInputConfirm"
        >{{ tagBtn[0].txt }}</el-button
      >
      <span class="describe"><i>*&nbsp;1个主标签，至多3个次标签</i></span>
    </div>
    <BlogEditor ref="bolgEditor" v-if="isShow"></BlogEditor>
    <div class="button">
      <el-button type="primary" class="publish" @click="publishBlog"
        >发布博文</el-button
      >
    </div>
  </div>
</template>

<script>
import BlogEditor from "@/components/editor/BlogEditor";
import { publishBlog } from "@/network/admin";
import matchTag from "@/utils/matchTag";
export default {
  name: "AdminPublish",
  components: {
    BlogEditor,
  },
  data() {
    return {
      isShow: true,
      title: "",
      dynamicTags: [],
      tagTemplate: [
        { value: "JavaScript" },
        { value: "TypeScript" },
        { value: "Java" },
        { value: "Python" },
        { value: "入站必刷" },
        { value: "唠嗑" },
      ], //格式很重要
      inputVisible: false,
      inputValue: "",
      content: "",
    };
  },
  computed: {
    tagBtn() {
      if (!this.inputValue && this.inputVisible) {
        return [
          { txt: "取消", type: "warning" },
          { txt: "确定", type: "primary" },
        ];
      } else {
        return [
          { txt: "确定", type: "primary" },
          { txt: "取消", type: "warning" },
        ];
      }
    },
  },
  filters: {
    tagType(value) {
      return matchTag(value);
    },
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.dynamicTags.length < 4) {
        if (this.inputValue) {
          let tagObject = {
            tag_name: this.inputValue,
            tag_type: this.dynamicTags.length,
          };
          this.dynamicTags.push(tagObject);
        }
      } else {
        this.$message("标签数量已上限！");
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    querySearch(queryString, callback) {
      let tagTemplate = this.tagTemplate;
      let results = queryString
        ? tagTemplate.filter(
            (item) =>
              item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          )
        : tagTemplate;
      // 调用 callback 返回建议列表的数据
      callback(results);
    },
    handleSelect(item) {
      if (item.value) {
        this.inputValue = item.value;
      }
    },
    async publishBlog() {
      if (this.title === "") {
        this.$message({
          message: "博文标题不建议为空",
          type: "warning",
        });
      } else if (this.dynamicTags.length === 0) {
        this.$message({
          message: "博文必须要有一个主标签！",
          type: "error",
        });
      } else {
        let content = this.$refs["bolgEditor"].editor.txt.html();
        let title = this.title;
        let tags = this.dynamicTags;
        let result = await publishBlog({ content, tags, title });
        if (result.data.status) {
          this.$message({
            message: result.data.msg,
            type: "success",
          });
          //刷新页面
          this.isShow = false;
          this.$nextTick(() => {
            this.isShow = true;
          });
        } else {
          this.$message({
            message: result.data.msg,
            type: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.adminPublish {
  .label {
    font-size: 1.8rem;
    text-align: center;
    min-width: 100px;
    font-family: myFont;
  }
  .title-box,
  .tag-box {
    display: flex;
    align-items: center;
    padding: 20px 0;
    margin-bottom: 20px;
    .describe {
      color: #999;
      font-size: 12px;
      margin-left: 20px;
    }
  }
  .title-box {
    .el-input {
      width: 460px;
    }
  }
  .tag-box {
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      width: 115px;
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 115px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .tagConfirm {
      margin-left: 10px;
    }
  }

  .button {
    text-align: right;
    .publish {
      margin: 40px 0;
      width: 120px;
    }
  }
}
</style>