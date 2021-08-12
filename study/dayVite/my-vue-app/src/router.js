import * as VueRouter from 'vue-router'

import Home from './views/home.vue'
import Shop from './views/shop.vue'
import NotFound from './views/404.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/404', component: NotFound },
  { path: '/:pathMatch(.*)', redirect: '/404'}
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router

