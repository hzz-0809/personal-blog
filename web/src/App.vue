<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url("./assets/css/normalize.css");
@import url("./assets/css/base.css");
body {
  min-width: 768px;
}
#app {
  min-height: 100vh;
}
</style>


