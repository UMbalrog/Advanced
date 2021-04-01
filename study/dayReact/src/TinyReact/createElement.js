export default function createElement (type, props, ...children) { 
  // console.log(children)
  const childElements = [].concat(...children).reduce((res, child) => {
    if(child !== false && child !== true && child !== null){
      if (child instanceof Object){
        res.push(child)
      } else if(child){
        res.push(createElement('text', { textContent: child }))
      }
    }
    return res
  }, [])

  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}