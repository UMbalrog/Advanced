import diff from "./diff";

export default class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
   
    let virtualDOM = this.render();  // 新的DOM
    let oldDOM = this.getDOM(); // 获取旧的 virtualDOM 对象 进行比对
    // 获取容器
    let container = oldDOM.parentNode;
    // 实现对象
    diff(virtualDOM, container, oldDOM);
  }
  setDOM(dom) {
    this._dom = dom
  }
  getDOM() {
    return this._dom
  }
}