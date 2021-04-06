export default function unmountNode(node) {
  let virtualDOM = node._virtualDOM;
  // 判断文件类型
  if(virtualDOM.type === 'text'){
    // 删除节点
    node.remove()
    // 阻止程序向下执行
    return
  }
  // 2. 判断节点是否是由组件生成的
  let component = virtualDOM.component;
  if(component){
    component.componentWillUnmount()
  }
  // 3. 判断节点身上是否有ref属性, 有则制空
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }
  // 4. 判断节点的属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach( propName => {
    if(propName.slice(0, 2) == 'on'){
      let eventName = propName.toLowerCase().slice(0,2);
      let eventHandler = virtualDOM.props[propName];
      node.removeEventListener(eventName, eventHandler);
    }
  })

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i-- //这里不准确
    }
  }
  // 删除节点
  node.remove()
}