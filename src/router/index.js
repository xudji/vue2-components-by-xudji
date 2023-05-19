import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/table'
    },
    {
        path: '/table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "index" */ '@/views/table'),
        mate: {
            title: '表格',
            auth: false
        }
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import(/* webpackChunkName: "login" */ '@/views/form'),
        meta: {
            title: '表单',
            auth: false
        },

    },
    {
        path: '/toastConfirm',
        name: 'toastConfirm',
        component: () => import(/* webpackChunkName: "login" */ '@/views/toastConfirm'),
        meta: {
            title: '弹窗',
            auth: false
        },

    },
    {
        path: '/tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "login" */ '@/views/tree'),
        meta: {
            title: '树',
            auth: false
        },

    },
    {
        path: '/tree-select',
        name: 'tree-select',
        component: () => import(/* webpackChunkName: "login" */ '@/views/tree-select'),
        meta: {
            title: '树选择',
            auth: false
        },

    },





]
const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router