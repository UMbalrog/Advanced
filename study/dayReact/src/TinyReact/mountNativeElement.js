import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode"

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  // 如果有旧节点则删除
  if(oldDOM){
    unmountNode(oldDOM)
  }
  // 将结果插入父级元素中
  container.appendChild(newElement)

  // 类组件保存这一版DOM到实例中，作为下一次渲染的旧版DOM，也局势记录上一次的更新状态；
  let component = virtualDOM.component
  if(component){
    component.setDOM(newElement)
  }
  
}