import diff from "./diff";

export default function updateComponent(
  virtualDOM, 
  oldComponent, 
  oldDOM, 
  container
) {
  // 生命周期函数执行
  oldComponent.componentWillReceiveProps(virtualDOM.props)

  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    let prevProps = oldComponent.props;
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 相同组件，更新属性
    oldComponent.updateProps(virtualDOM.props)
    // 获取组件返回的最新的 virtualDOM
    const nextVirtualDOM = oldComponent.render()
    // 更新 component 组件实例对象
    nextVirtualDOM.component = oldComponent
    diff(nextVirtualDOM, container, oldDOM)

    // 完成执行生命周期
    oldComponent.componentDidUpdate(prevProps)
  }
}