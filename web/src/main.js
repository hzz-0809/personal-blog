import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import VueParticles from 'vue-particles'
import 'highlight.js/styles/atom-one-dark.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI).use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
