<template>
  <div class="Output" v-html="content"></div>
</template>
<script>
export default {
  name: "Output",
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/wangEditor.css";
.Output {
  padding: 10px;
  font-size: 1.6rem;
}
</style>

