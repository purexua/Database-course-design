// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../views/index/Home.vue'
import Book from '../views/index/Book.vue'

const router = new VueRouter({
   mode: 'hash',
   routes: [
      {
         name: 'login',
         path: '/login',
         component: Login,
         meta: { 'title': '登录' }
      },
      {
         name: 'index',
         path: '/',
         component: Index,
         meta: { 'title': '网上书店管理系统' },
         children: [
            {
               name: 'home',
               path: 'home',
               component: Home,
               meta: { 'title': '首页' }
            },
            {
               name: 'computer',
               path: 'computer',
               component: Book,
               meta: { 'title': '计算机分区 购买' }
            },
            {
               name: 'history',
               path: 'history',
               component: Book,
               meta: { 'title': '历史分区 购买' }
            },
            {
               name : 'popularscience',
               path : 'popularscience',
               component : Book,
               meta : {'title' : '科普分区 购买'}
            },
            {
               name : 'sciencefiction',
               path : 'sciencefiction',
               component : Book,
               meta : {'title' : '科幻分区 购买'}
            },
            {
               name :'children',
               path : 'children',
               component : Book,
               meta : {'title' : '儿童读物分区 购买'}
            }
         ]
      }
   ]
}
)

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
   next()
})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
   document.title = to.meta.title || '网上书店管理系统'
})

export default router