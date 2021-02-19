import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router } = createApp()

// 客户端也行等到路由加载完成再挂载app
router.onReady(() => {
  app.$mount('#app')
})