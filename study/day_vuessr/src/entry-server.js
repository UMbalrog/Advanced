import { createApp } from './app'

export default async context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router, store } = createApp()

  const meta = app.$meta() // here

  // 设置服务器端 router 的位置
  router.push(context.url) // 服务端跳转到当前路由位置 push是去跳转

  context.meta = meta // and here

  // 可简单写为
  await new Promise(router.onReady.bind(router))
  // 服务端渲染完毕被调用，可以拿到完整数据
  context.rendered = () => {
    // Renderer 会把 context.state 数据对象内联到页面模板中
    // 最终发送给客户端的页面中会包含一段脚本：window.__INITIAL_STATE__ = context.state
    // 客户端就要把页面中的 window.__INITIAL_STATE__ 拿出来填充到客户端 store 容器中
    context.state = store.state;
  }

  return app;

}

// export default context => {
//   // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
//   // 以便服务器能够等待所有的内容在渲染前，
//   // 就已经准备就绪。
//   return new Promise((resolve, reject) => {
//     const { app, router } = createApp()

//     // 设置服务器端 router 的位置
//     router.push(context.url)

//     // 等到 router 将可能的异步组件和钩子函数解析完
//     router.onReady(() => {
//       // 404错误可以不用执行
//       // const matchedComponents = router.getMatchedComponents()
//       // // 匹配不到的路由，执行 reject 函数，并返回 404
//       // if (!matchedComponents.length) {
//       //   return reject({ code: 404 })
//       // }

//       // Promise 应该 resolve 应用程序实例，以便它可以渲染
//       resolve(app)
//     }, reject)
//   });

// }
