import createDOMElement from "./createDOMElement"

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  
  // 将结果插入父级元素中
  container.appendChild(newElement)
}