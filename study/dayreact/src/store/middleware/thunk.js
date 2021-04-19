export default ({dispatch}) => next => action => {
  if(typeof action == 'function'){ //传递函数则为异步操作
    return action(dispatch)
  }
  next(action);
}