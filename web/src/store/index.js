import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isLoading:true,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeIsLoading(state,value){
      state.isLoading = value
    },
    changeUserInfo(state,value){
      state.userInfo = value
    },
    clearUserInfo(state,value){
      state.userInfo = value
    }
  },
  actions: {
  },
  modules: {

  },
  plugins:[createPersistedState({
    paths:["userInfo"]
  })]
})
