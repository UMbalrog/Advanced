import { Component } from "../Component";

const getTag = vdom => {
  if (typeof vdom.type === "string") {
    return "host_component"
  } else if(Object.getPrototypeOf(vdom.type) === Component){
    return "class_component" // 类组件
  } else {
    return "function_component" // 函数组件
  }
}

export default getTag