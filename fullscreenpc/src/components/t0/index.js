import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
  namespaced: true,
  state: {
    opendailog: []
  },
  actions: {
    opendailog({ commit }, para) {
      commit("setdailogPara", para)
    }
  },
  mutations: {
    setdailogPara(state, para) {
      state.opendailog.push(para)
    }
  }
}
