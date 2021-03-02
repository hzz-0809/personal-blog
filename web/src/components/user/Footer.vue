<template>
  <div class="Footer">
    <div class="left">
      <p>状态:随便写写，不更新很正常&nbsp;:&nbsp;)</p>
      <p>源码请访问github</p>
      <p class="copyright">
        Copyright&nbsp;&copy;&nbsp;2020-2021&nbsp;EvanZhao
      </p>
    </div>
    <div class="right">
      <img
        src="@/assets/img/icon/weixin.jpg"
        alt="微信"
        title="微信"
        class="weixin"
      />
      <div class="link">
        <el-link :underline="false" href="https://github.com/hzz-0809"
          >github</el-link
        >
        <el-divider direction="vertical" />
        <el-link :underline="false" href="https://gitee.com/hzz-0809"
          >gitee</el-link
        >
        <el-divider direction="vertical" />
        <el-link :underline="false" href="https://cnblogs.com/hzz-499"
          >cnblogs</el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
$bgColor: #718093;
.Footer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 0;
  background: $bgColor;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-family: "黑体";
  .right {
    width: 165px;
    height: 160px;
    img {
      display: block;
      margin: 0 auto 10px;
      width: 150px;
    }
    a {
      color: white;
    }
  }
}
p {
  font-size: 16px;
}
.copyright {
  font-size: 18px;
  font-weight: bold;
}
</style>