import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    avatar: ""
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token)
    },
    delToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    setAvatar(state, url) {
      state.avatar = url;
    }
  },
  actions: {
  },
  modules: {
  }
})
