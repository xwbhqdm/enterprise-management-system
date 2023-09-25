import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue";
import MainBox from "@/views/MainBox.vue";
import RoutesConfig from './config'
import store from '@/store/index'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mainbox',
        name: 'mainbox',
        component: MainBox
        //mainbox的嵌套路由后边根据权限动态添加
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
//路由守卫 在路由跳转前生效
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next()
    } else {
        //如果授权(已经登录过了) next()
        //未授权, 重定向到login
        if (!localStorage.getItem('token')) {
            next({
              path:'/login'
            })
        }else {
            //因为在登录时把isGetterRouter修改成false所以每次都执行if判断
          if (!store.state.isGetterRouter){
              //isGetterRouter为假就删除mainbox路由
              router.removeRoute('mainbox')
              ConfigRouter()
            next({
              path:to.fullPath
            })
          }else {
            next()
          }
        }
    }
})
//添加动态路由
const ConfigRouter = () => {
    //判断是否存在mainbox路由没有就添加
    if (!router.hasRoute('mainbox')){
        router.addRoute({
            path: '/mainbox',
            name: 'mainbox',
            component: MainBox
        })
    }
    RoutesConfig.forEach((item)=>{
        //checkpermission返回true才会添加mainbox的子路由
        checkpermission(item) && router.addRoute('mainbox',item)
    })
    //改变isGetterRouter =  true
    store.commit("changeGetterRouter", true)
}

const checkpermission =(item)=>{
    //在用户管理路由中添加requireAdmin字段 如果等于true说明需要权限控制
    if (item.requireAdmin){
        //如果身份是管理员返回true 不是返回false
        return store.state.userInfo.role === 2
    }
    return true
}
export default router
