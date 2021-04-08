import { 
  CreateTaskQueue, 
  arrified, 
  createStateNode, 
  getTag
} from "./Misc";

// 任务队列
const taskQueue = CreateTaskQueue();
// 正在执行的任务 fiber 对象
let subTask = null;
// 渲染数组 fiber 对象数组
let pendingCommit = null;

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    if (item.effectTag === "placement") {
      item.parent.stateNode.appendChild(item.stateNode)
    }
  })
}

const reconcileChildren = (fiber, children) => {
  // 这里子级参数可能为数组或对象，需要处理一下
  const arrifiedChildren = arrified(children)
  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let newFiber = null; //子级 fiber 对象
  let prevFiber = null; //上一个 fiber 对象

  while(index < numberOfElements){
    // 获取子级 virtualDOM 对象
    let element = arrifiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: "placement", // placement新增，pudate修改, delete删除
      stateNode: null,
      parent: fiber //关系
    }
    // 设置stateNode
    newFiber.stateNode = createStateNode(newFiber)
    // 设置节点间的关系
    if(index == 0){
      fiber.child = newFiber;
    }else{
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;

    index++;
  }

}

const executeTask = fiber => {
  // 构建子级fiber
  reconcileChildren(fiber, fiber.props.children)
  // 如果父级有字节节点，则返回子级节点进行下一级节点的构建
  if(fiber.child){
    return fiber.child
  }

  // 如果存在同级 返回同级 构建同级的子级
  // 如果同级不存在 返回到父级 看父级是否有同级

  let currentExecutelyFiber = fiber
  while(currentExecutelyFiber.parent){
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )
    if(currentExecutelyFiber.sibling){
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent
  }

  pendingCommit = currentExecutelyFiber;
}

const getFirstTask = () => {
  // 获取子任务
  const task = taskQueue.pop()

  // 返回最外层节点的fiber对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null
  }
}

const workLoop = deadline => {
  // 获取任务，全局subTask，一次执行一个任务
  if (!subTask) {
    subTask = getFirstTask() //返回fiber对象
  }

  if(subTask && deadline.timeRemaining() > 1){
    // 执行任务 并且 返回下一个新的任务
    subTask = executeTask(subTask)
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

  if(pendingCommit){
    commitAllWork(pendingCommit)
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