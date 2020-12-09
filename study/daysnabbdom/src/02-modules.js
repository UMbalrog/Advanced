import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'
// 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

let patch = init([
  styleModule,
  eventListenersModule
])

let app = document.querySelector('#app')
let vnode = h('div#container', {
  style: {
    backgroundColor:'red'
  },
  on:{
    click: haunlder
  }
}, [
  h('h1.classh1', '我是标题'),
  h('p.list', 'Hello World')
])
function haunlder(){
  console.log('我被点击了')
}
patch(app, vnode)