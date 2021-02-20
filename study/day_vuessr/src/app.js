import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'
import VueMeta from 'vue-meta'
import { createStore } from './store/index'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - SSR渲染'
  }
})
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}
