<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo asideMenu"
    :router="true"
    :collapse="isCollapse"
  >
    <slot name="el-menu-item-top"></slot>
    <slot name="el-submenu"></slot>
    <slot name="el-menu-item-bottom"></slot>
  </el-menu>
</template>

<script>
export default {
  name: "AsideMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    },
  },
  methods: {
    getScrollbarWidth() {
      //思路就是设置一个div没有滚动条的,获取其宽度,然后再让其拥有滚动条,在获取宽度,取差值
      let odiv = document.createElement("div");
      let styles = {
        width: "100px",
        height: "100px",
        overflowY: "scroll",
      };
      let scrollbarWidth;
      for (let i in styles) odiv.style[i] = styles[i];
      document.body.appendChild(odiv);
      scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
      odiv.remove();
      return scrollbarWidth;
    },
    changeMenu() {
      if (document.body.offsetWidth + this.getScrollbarWidth() <= 1200) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
  },
  mounted() {
    this.changeMenu();
    window.addEventListener("resize", () => {
      this.changeMenu();
    });
  },
};
</script>
<style lang="scss">
.asideMenu.el-menu {
  user-select: none;
  .el-menu-item,
  .el-submenu {
    min-width: 180px;
  }
}
@media screen and (max-width: 1200px) {
  .asideMenu.el-menu {
    .el-menu-item,
    .el-submenu {
      min-width: auto;
    }
  }
}
</style>