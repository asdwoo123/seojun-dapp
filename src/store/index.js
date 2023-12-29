import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: false,
    stationsData: [],
    stationNodes: []
  },
  getters: {
  },
  mutations: {
    insertData(state, payload) {
      if (payload == [] ) {
          state.stationsData = [];
          return;
      }   
  }
  },
  actions: {
  },
  modules: {
  }
})
