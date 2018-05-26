import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
  namespaced: true,
  state: {
    apidata: []
  },
  actions: {
    getdata({ commit },para) {
      console.log(para)
      Vue.prototype.$http('/static/data/cycleCount.json', {type:para}, function (response) {
        commit('updateChart', response)
      })
    }
  },
  mutations: {
    updateChart(state, response) {
      state.apidata = response;
    }
  }
}
