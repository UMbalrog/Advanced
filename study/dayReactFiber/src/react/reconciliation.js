import { updateNodeElement } from "./DOM";
import { 
  CreateTaskQueue, 
  arrified, 
  createStateNode, 
  getTag,
  getRoot
} from "./Misc";

// 任务队列
const taskQueue = CreateTaskQueue();
// 正在执行的任务 fiber 对象
let subTask = null;
// 渲染数组 fiber 对象数组
let pendingCommit = null;

const commitAllWork = fiber => {
  // 循环 effects 数组，构建 DOM 节点树
  fiber.effects.forEach(item => {

    if(item.tag === "class_component"){
      item.stateNode.__fiber = item
    }


    if(item.effectTag === "delete"){
      // 删除
      item.parent.stateNode.removeChild(item.stateNode);
    }else if(item.effectTag === "update"){
      // 更新
      if (item.type === item.alternate.type) {
        // 节点类型相同 去对比
        updateNodeElement(item.stateNode, item, item.alternate)
      } else {
        // 节点类型不同 直接替换
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTag === "placement") {
      // 新增
      let fiber = item;
      let parentFiber = item.parent;
      while(parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component'){
        parentFiber = parentFiber.parent
      }
      // 如果子节点是普通节点 找到父级 将子节点追加到父级中
      if(fiber.tag === 'host_component'){
        parentFiber.stateNode.appendChild(fiber.stateNode)
      } 
     
    }
  })

  // 备份旧的 fiber 节点对象
  fiber.stateNode.__rootFiberContainer = fiber;
}

const reconcileChildren = (fiber, children) => {
  // 这里子级参数可能为数组或对象，需要处理一下
  const arrifiedChildren = arrified(children)
  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;  //循环过程中的循环项 就是子节点的 virtualDOM 对象
  let newFiber = null; //子级 fiber 对象
  let prevFiber = null; //上一个 fiber 对象
  let alternate = null; // 子节点的备份旧节点

  // 如果父级有备份节点，并且父级备份节点有子节点，则这个备份子节点，就是现在新的子节点的第一个子节点的备份节点
  if(fiber.alternate && fiber.alternate.child){
    alternate = fiber.alternate.child
  }

  while(index < numberOfElements || alternate){
    // 获取子级 virtualDOM 对象
    element = arrifiedChildren[index];

    if(!element && alternate){
      // 删除
      alternate.effectTag = "delete";
      fiber.effects.push(alternate);
    }else if(element && alternate){
      // 更新
      // 构建子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update", // placement新增，update修改, delete删除
        parent: fiber, //关系
        alternate
      }
      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode;
      }else{
        // 类型不同 新建
        newFiber.stateNode = createStateNode(newFiber);
      }

    }else if(element && !alternate) {
      // 初始渲染
      // 构建子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement", // placement新增，pudate修改, delete删除
        parent: fiber //关系
      }
      // 设置stateNode
      newFiber.stateNode = createStateNode(newFiber)
    }
    
    // 设置节点间的关系
    if(index == 0){
      fiber.child = newFiber;
    }else if(element){
      prevFiber.sibling = newFiber;
    }

    // 将备份节点传给下一个
    if(alternate && alternate.sibling){ 
      alternate = alternate.sibling
    }else{ // 没有兄弟节点了就是没有备份的了，节点新增了
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
  }

}

const executeTask = fiber => {
  // 构建子级fiber
  if(fiber.tag === 'class_component'){ //类组价
    // 类组件更新状态
    if(fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState){
      console.log(fiber.stateNode.__fiber)
      // 如果有更新值则开始更新
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState
      } 
    }

    reconcileChildren(fiber, fiber.stateNode.render())
  }else if(fiber.tag === 'function_component'){
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  }else{
    reconcileChildren(fiber, fiber.props.children)
  }
  
  // 如果父级有字节节点，则返回子级节点进行下一级节点的构建
  if(fiber.child){
    return fiber.child
  }

  // 如果存在同级 返回同级 构建同级的子级
  // 如果同级不存在 返回到父级 看父级是否有同级
  let currentExecutelyFiber = fiber
  while(currentExecutelyFiber.parent){
    // 合并effects数组
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )
    if(currentExecutelyFiber.sibling){
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  pendingCommit = currentExecutelyFiber;
  console.log(pendingCommit)
}

const getFirstTask = () => {
  // 获取子任务
  const task = taskQueue.pop()

  if(task.from === 'class_component'){
    // 类组件更新时
    let root = getRoot(task.instance); // 返回顶父级fiber
    task.instance.__fiber.partialState = task.partialState
    // 重新返回根节点
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: "host_root",
      effects: [],
      child: null,
      alternate: root
    }
  }

  // 返回最外层节点的fiber对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer // 上一版备份旧节点记录
  }
}

const workLoop = deadline => {
  // 获取任务，全局subTask，一次执行一个任务
  if (!subTask) {
    subTask = getFirstTask() //返回fiber对象
  }

  while(subTask && deadline.timeRemaining() > 1){
    // 执行任务 并且 返回下一个新的任务
    subTask = executeTask(subTask)
  }

  // 构建循环结束后执行渲染
  if(pendingCommit){
    commitAllWork(pendingCommit)
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  
  // 当任务被终止
  // 判断任务是否存在或者任务队列中是否还有任务没有执行
  // 再一次告诉浏览器在空闲的时间执行任务
  if(subTask || !taskQueue.isEmpty()){
    requestIdleCallback(performTask)
  }

}

export const render = (element, dom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */
  /**
   * 任务就是通过 vdom 对象 构建 fiber 对象
   */
  taskQueue.push({
    dom,
    props: { children: element }
  })
  // 指定在浏览器空闲的时间去执行任务构建Fiber数组
  requestIdleCallback(performTask)
}

export const scheduleUpdate = (instance, partialState) => { //组件更新函数
  taskQueue.push({
    from: 'class_component',
    instance,  //组件实例
    partialState
  })

  requestIdleCallback(performTask)
}