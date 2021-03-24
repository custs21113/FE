import { Message } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../components/index')
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../components/home'),
        children: [{
            name: 'users',
            path: 'users',
            component: () => import('../components/users')
        },
        {
            path: '/rights',
            name: 'rights',
            component: () => import('../components/rights')
        },
        {
            path: '/roles',
            name: 'roles',
            component: () => import('../components/rights/roles.vue')
        },
        {
            path: 'orders',
            name: 'orders',
            component: () => import('../components/orders'),
        },
        {
            path: 'goods',
            name: 'goods',
            component: () => import('../components/goods'),
        },
        {
            path: 'goods/add',
            name: 'goodsadd',
            component: () => import('../components/goods/goodsadd.vue'),
        },
        {
            path: 'goods/add_backup',
            name: 'goodsadd_backup',
            component: () => import('../components/goods/goodsadd_backup.vue'),
        },
        {
            path: 'params',
            name: 'params',
            component: () => import('../components/goods/cateparams.vue'),
        },
        {
            path: 'categories',
            name: 'categories',
            component: () => import('../components/goods/goodscate.vue'),
        },
        {
            path: 'reports',
            name: 'reports',
            component: () => import('../components/reports'),
        },]
    },
]



const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL, 
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.path === '/login') {
        next()
    } else {
        
    let token = localStorage.getItem("token");
        if(!token) {
            Message.warning('请先登录')
            router.push('/login')
        } else {
            next()
        }
    }

})

export default router