import News from "@/views/News.vue";
import Product from "@/views/Product.vue";
import NewItem from "@/views/NewItem.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/news',
        name: 'news',
        component: News
    },
    {
        path: '/product',
        name: 'product',
        component: Product
    },
    {
        path: '/news/:id',
        name: 'new',
        component: NewItem
    },
]
export default routes