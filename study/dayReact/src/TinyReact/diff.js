import mountElement from './mountElement'
export default function diff(virtualDOM, container, oldDOM) {
  // 对比并创建元素
  // 判断如果旧节点不存在则新建
  if(!oldDOM) {
    mountElement(virtualDOM, container, oldDOM)
  }
}