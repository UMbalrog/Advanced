import createDOMElement from './createDOMElement';
import diffComponent from './diffComponent';
import mountElement from './mountElement'
import unmountNode from './unmountNode';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
  // 对比并创建元素
  // 判断如果旧节点不存在则新建
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  } else if(
    virtualDOM.type !== oldVirtualDOM.type && 
    typeof virtualDOM.type !== "function") {
    // 如果要比对的两个节点类型不相同 并且 并且节点的类型不是组件 因为组件要单独处理

    // 使用新的 virtualDOM 对象生成真实 DOM 对象  
    const newElement = createDOMElement(virtualDOM)
    // 用新节点替换
    oldDOM.parentNode.replaceChild(newElement, oldDOM)

  } else if(typeof virtualDOM.type === "function") {
    // 如果是组件对比
    // 要更新的是组件
    // 1) 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
    // 2) 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
    // 3) 要更新的 DOM 象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
    // 4) 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 相同类型节点
    if (virtualDOM.type === "text") {
      // 文本节点更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 是元素节点更新元素属性，事件
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 处理子节点
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })

    // 删除节点
    let oldChildNodes = oldDOM.childNodes //获取旧节点
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 有节点需要被删除
      for (
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i--
      ) {
        unmountNode(oldChildNodes[i])
      }
    }

  }
}