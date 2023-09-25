import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetterRouter: false,
    //折叠菜单的状态
    isCollapsed:false,
    //用于存储用户的数据
    userInfo:{},
    userInfoarr:[]
  },

  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    //改变折叠菜单的状态
    changeCollapsed(state){
      state.isCollapsed = !state.isCollapsed
    },
    //设置用户信息
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    //用于用户管理用户列表
    changeUserInfoArr(state,value){
      state.userInfoarr = [value]
    },
    //清空用户信息
    clearUserInfo(state){
      state.userInfo={}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths:["isCollapsed","userInfo"] //控制是否持久化
  })],
})
