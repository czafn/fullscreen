import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
  namespaced: true,
  state: {
    apidata: {}
  },
  actions: {
    getdata({ commit },para) {
      Vue.prototype.$http('/static/data/item.json', {type:para}, function (response) {

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
