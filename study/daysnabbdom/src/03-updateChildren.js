import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'

let patch = init([])

// 首次渲染
let vnode = h('ul', [
  h('li', {key:'a'}, '首页'),
  h('li', {key:'b'}, '视频'),
  h('li', {key:'c'}, '微博'),
  h('li', {key:'d'}, '哈哈')
])
let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

// updateChildren 的执行过程
vnode = h('ul', [
  h('div', {key:'a'}, '首页1'),
  h('div', {key:'c'}, '微博2'),
  h('div', {key:'b'}, '视频3'),
  h('div', {key:'e'}, '哈哈4')
])
patch(oldVnode, vnode)