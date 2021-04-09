import React, { Component, render } from './react';
const root = document.getElementById("root")

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hi Fiber</p>
  </div>
)

// render(jsx, root)

// setTimeout(() => {
//   const jsx = (
//     <div>
//       <p>Hi Fiber</p>
//     </div>
//   )
//   render(jsx, root)
// }, 2000)

// 类组件

class Greating extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "张三"
    }
  }
  render() {
    return (
      <div>
        <div>家居安静啊就按</div>
        {this.props.title}hahahaha {this.state.name}
        <button onClick={() => this.setState({ name: "李四" })}>button</button>
      </div>
    )
  }
}


render(<Greating title="奥利给"/>, root)

function FnComponent(props) {
  return <div>{props.title}FnComponent</div>
}

// render(<FnComponent title="Hello" />, root)