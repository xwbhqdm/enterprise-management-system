import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from '@/views/Login.vue'
import Register from "@/views/Register.vue";
import ConfigRoutes from '@/router/config'
import MainBox from "@/views/MainBox.vue";
const routes = [
  {
    path: '/mainbox',
    name:'mainbox',
    component: MainBox
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
ConfigRoutes.forEach((item)=>{
  router.addRoute("mainbox",item)
})
router.beforeEach((to,from,next)=>{
NProgress.start()
  next()
})
router.afterEach((to,from,next)=>{
  NProgress.done()
})
export default router
