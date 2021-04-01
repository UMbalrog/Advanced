import mountNativeElement from "./mountNativeElement"
import mountComponent from "./mountComponent"
import isFunction from "./isFunction"
export default function mountElement(virtualDOM, container, oldDOM){
  // 创建要分组件和元素 
  // Component VS NativeElement
  if(isFunction(virtualDOM)){
    // Component
    mountComponent(virtualDOM, container, oldDOM)
  }else{
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}