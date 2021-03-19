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
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL, 
    routes,
})

export default router