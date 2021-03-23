export default function createElement (type, props, ...children) {  
  // console.log(children)
  const childElements = [].concat(children).map(child => {
    if (child instanceof Object){
      return child
    } else if(child){
      return createElement('text', { textContent: child })
    } else {
      return ''
    }
  })

  return {
    type,
    props,
    children: childElements
  }
}