import Home from '@/views/home/Home.vue'
import Center from "@/views/center/Center.vue";
//用户管理
import UserAdd from "@/views/user-manage/UserAdd.vue";
import UserList from "@/views/user-manage/UserList.vue";
//新闻管理
import NewsAdd from "@/views/new-manage/NewsAdd.vue";
import NewsList from "@/views/new-manage/NewsList.vue";
//产品管理
import ProductAdd from "@/views/product-manage/ProductAdd.vue";
import ProductList from "@/views/product-manage/ProductList.vue";
import NotFount from "@/views/notfount/NotFount.vue";
import NewsEdit from "@/views/new-manage/NewsEdit.vue";
import ProductEdit from "@/views/product-manage/ProductEdit.vue";
const  routes = [
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/user-manage/adduser",
        component:UserAdd,
        requireAdmin:true
    },
    {
       path:"/user-manage/userlist",
        component:UserList,
        requireAdmin:true
    },

    {
        path:"/news-manage/addnews",
        component:NewsAdd
    },
    {
        path:"/news-manage/newslist",
        component:NewsList
    },
    {
        path:"/news-manage/editnews/:id",
        component:NewsEdit
    },
    {
        path:"/product-manage/addproduct",
        component:ProductAdd
    },
    {
        path:"/product-manage/productlist",
        component:ProductList
    },
    {
        path:"/product-manage/editproduct/:id",
        component:ProductEdit
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFount
    },
]

export default routes