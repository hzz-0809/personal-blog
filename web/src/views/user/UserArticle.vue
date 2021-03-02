<template>
  <div class="UserArticle">
    <div class="filters">
      <span><i class="el-icon-s-data"></i>&nbsp;顺序：</span>
      <el-radio-group v-model="filter" size="mini" @change="filterChange">
        <el-radio-button :label="0"
          ><img src="@/assets/img/icon/hot.png" alt="" />热门</el-radio-button
        >
        <el-radio-button :label="1"
          ><img src="@/assets/img/icon/new.png" alt="" />最新</el-radio-button
        >
      </el-radio-group>
    </div>
    <BlogCard :blogs="blogs"></BlogCard>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :pager-count="pagerCount"
      :current-page="currentPage"
      @current-change="pageChange"
      hide-on-single-page
    >
    </el-pagination>
  </div>
</template>

<script>
import BlogCard from "@/components/user/BlogCard";
import { getBlogByPage } from "@/network/user";
export default {
  name: "UserArticle",
  components: {
    BlogCard,
  },
  data() {
    return {
      filter: 0,
      pageSize: 6,
      pagerCount: 5,
      total: 0,
      currentPage: 1,
      blogs: [],
    };
  },
  methods: {
    async filterChange() {
      let res = await getBlogByPage({
        filter: this.filter,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.total = res.data.data.total;
      this.blogs = res.data.data.blogs;
    },
    async pageChange(val) {
      //巨坑玩意，current-change事件绑定的方法默认传入一个值，就是点击的当前页数
      this.currentPage = val;
      let res = await getBlogByPage({
        filter: this.filter,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.total = res.data.data.total;
      this.blogs = res.data.data.blogs;
    },
  },
  async mounted() {
    let res = await getBlogByPage({
      filter: this.filter,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    });
    this.total = res.data.data.total;
    this.blogs = res.data.data.blogs;
  },
};
</script>
<style lang="scss">
.UserArticle {
  .filters {
    margin-bottom: 20px;
    margin-right: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > span {
      font-size: 2rem;
      font-family: myFont;
    }

    .el-radio-button__inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
  .el-pagination {
    margin: 40px 0 20px 0;
    text-align: center;
  }
}

@media screen and (max-width: 992px) {
  .UserArticle .filters {
    justify-content: center;
  }
}
</style>