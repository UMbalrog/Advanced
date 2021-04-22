import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from 'react-dom';

function Api (props) {  

  // function scroller() {
  //   console.log('滚动了')
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', scroller)
  //   return () => {
  //     window.removeEventListener('scroll', scroller)
  //   }
  // }, [])

  // useEffect(() => {
  //   (async () => {
  //     await axios.get()
  //   })()
  // })
  // useEffect(() => {
  //   document.title = count
  // }, [count])

  // const result = useMemo(() => {
  //   return count *2
  // }, [count])

  // let timer = useRef();
  // useEffect(() => {
  //   timer = setInterval(() => {
  //     setCount(count + 1)
  //   },1000)
  // })
  // const stopCount = () => {
  //   clearInterval(timer)
  // }

  

  const [count, setCount] = useState(0);
  const resetCount = useCallback( () => setCount(0), [setCount])

  return <div>
    <div>{count}</div>
    <button onClick={ () => setCount(count+1) }> +1</button>
    <Test resetCount={resetCount}/>
  </div>
}

const Test = memo(function Test1(props){
  console.log('组件渲染了')
  return <div>
    Test
    <button onClick={ props.resetCount }> reset </button>
  </div>
})


export default Api;