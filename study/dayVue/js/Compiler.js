/*
  Compiler
  -------------
  + el
  + vm vue实例
  -------------
  + compile(el) 变了所有节点
  + compileElement(node) 标签 - 解析指令
  + compileText(node) 文本 - 解析差值表达式
  + isDirective(attrName) 判断此属性是否为指令
  + isTextNode(node)  是否文本
  + isElementNode(node)  是否标签
*/ 

class Compiler{
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {

  }
  // 编译元素节点，处理指令
  compileElement(node) {

  }
  // 编译文本，处理差值表达式
  compileText(node) {
    
  }
  // 判断此属性是否为指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断是否文本
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断是否标签
  isElementNode(node) {
    return node.nodeType === 1
  }

}