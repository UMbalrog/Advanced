import React from './react';

const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1">哈哈哈</div>
      <div id="c2"></div>
    </div>
    <div id="b2">
      <div id="c3">啊啊啊</div>
      <div id="c4"></div>
    </div>
    <div id="b3"></div>
  </div>
)

const container = document.getElementById("root");

render(jsx, container)
let workInProgressRoot = null;
let nextUnitOfWork = null;

function render(element, root) {
  // console.log(element)

  let fiberRoot = legacyCreateRootFromDOMContainer(element, root);
  
  performSyncWorkOnRoot(fiberRoot)
}

function legacyCreateRootFromDOMContainer (element, root) { 
  return {
    stateNode: root,
    props: {
      children: [element]
    }
  }
}

function performSyncWorkOnRoot(fiberRoot){
  workInProgressRoot = fiberRoot;
  nextUnitOfWork = workInProgressRoot;
  
  workLoopSync()

  
}
// 执行任务循环
function workLoopSync () {  
   
  while(nextUnitOfWork != null){
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  
  if (!nextUnitOfWork) {
    // 进入到第二阶段 执行DOM
    commitRoot()
  }

}
// 执行任务构建
function performUnitOfWork(unitOfWork){
  let next = null;
  // 父级到子级
  next = beginWork(unitOfWork);

  // 子级到父级
  if(next == null) {
    next = completeUnitOfWork(unitOfWork);
  }

  return next
}

function beginWork(workInProgressFiber) {
  // 创建 DOM
  if(!workInProgressFiber.stateNode){
    workInProgressFiber.stateNode = document.createElement(workInProgressFiber.type)
    for (let attr in workInProgressFiber.props) {
      if (attr !== "children") {
        workInProgressFiber.stateNode[attr] = workInProgressFiber.props[attr]
      }
    }
  }
  // 创建子级 Fiber
  // console.log(workInProgressFiber.props.children)
  if(Array.isArray(workInProgressFiber.props.children)){
    let preFiber = null;
    workInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type,
        props: child.props,
        effectTag: "PLACEMENT", //添加
        return: workInProgressFiber
      }

      if(index == 0){ // 第一个子级
        workInProgressFiber.child = childFiber;
      }else{
        preFiber.sibling = childFiber;
      }
      preFiber = childFiber;

    });

    return workInProgressFiber.child
  }
  
}

function completeUnitOfWork(workInProgressFiber){
  // console.log(workInProgressFiber)
  do{
    const returnFiber = workInProgressFiber.return;
    

    // 没有父级到根目录停止
    if(!returnFiber){return null};

    
    if(workInProgressFiber.child){
      console.log(workInProgressFiber.child)
      // return workInProgressFiber.child
    }

    // 记录位置用于渲染
    // 需要执行 DOM 操作的元素
    if (workInProgressFiber.effectTag) {
      
      if(!returnFiber.firstEffect){
        returnFiber.firstEffect = workInProgressFiber.firstEffect;
      }

      if(!returnFiber.lastEffect){
        returnFiber.lastEffect = workInProgressFiber.lastEffect;
      }

      if(returnFiber.lastEffect){ //第一次进入时，这里是lastEffectundefend
        returnFiber.lastEffect.nextEffect = workInProgressFiber
      }else{
        // 只有第一次走
        returnFiber.firstEffect = workInProgressFiber
      }
      // console.log(workInProgressFiber)
      returnFiber.lastEffect = workInProgressFiber;

    }

    // 像上循环，查找父级的其他子级
    if(workInProgressFiber.sibling){
      return workInProgressFiber.sibling
    }

    workInProgressFiber = returnFiber;
  }while(workInProgressFiber)
  return null;
}

function commitRoot(){
  console.log(workInProgressRoot)

  let currentFiber = workInProgressRoot.firstEffect
  while(currentFiber){
    // if(currentFiber.type == 'div'){
    //   currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    // }else{
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    // }
    


    currentFiber = currentFiber.nextEffect
  }
}