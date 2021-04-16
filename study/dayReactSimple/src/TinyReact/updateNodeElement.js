export default function updateNodeElement(
  newElement, // 要更新属性的DOM
  virtualDOM,
  oldVirtualDOM = {}
  ) {
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};
  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    if(newPropsValue !== oldPropsValue){ 
      // 不相等则开始更新
      // 判断属性是否是否事件属性 onClick -> click
      if (propName.slice(0, 2) === "on") {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue);
        // 删除原有的事件的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }

      } else if (propName === "value" || propName === "checked") {
        newElement[propName] = newPropsValue
      } else if (propName !== "children") {
        if (propName === "className") {
          newElement.setAttribute("class", newPropsValue)
        } else {
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
    
  })

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];
    if(!newPropsValue){
      // 新的属性里没有，则旧属性被删除了
      if (propName.slice(0, 2) === "on") { //如果是事件就移除
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if(propName !== "children") { // 除去children属性其他可移除
        newElement.removeAttribute(propName)
      }
    }
  })
}