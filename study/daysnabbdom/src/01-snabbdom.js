import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js' // helper function for creating vnodes
// 1. hello world案例
// 参数：数组，模块
// 返回值：patch函数，作用对比两个vnode的差异更新到真实DOM
let patch = init([])
// h函数
// 第一个参数：标签+选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container', 'Hello World')
let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)
let newvnode = h('div#ids.cla', [
  h('h1.classh1', '我是标题'),
  h('p.list', '我是文案')
])
patch(oldVnode, newvnode)

setTimeout(() => {
  // 清空元素用一个注释标签代替， h('!')
  patch(newvnode, h('!'))
},2000)