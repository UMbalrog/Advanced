import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as couterActions from '../store/actions/counter.action'

function Counter (props) {
  // console.log(props)
  return <div>
    <button onClick={ () => { props.increment_async(20)} }>+</button>
    <span>{props.count}</span>
    <button onClick={ () => { props.decrement(5)} }>-</button>
  </div>
}

// 1. connect 方法会帮助我们订阅store 当store中的状态发生更改的时候 会帮助我们重新渲染组件
// 2. connect 方法可以让我们获取store中的状态 将状态通过组件的props属性映射给组件
// 3. connect 方法可以让我们获取 dispatch 方法

const mapStateToProps = state => ({
  count: state.counter.count
});

const mapDispatchToProps = dispatch => bindActionCreators(couterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter);