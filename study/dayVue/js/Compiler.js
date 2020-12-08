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
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes;
    childNodes.forEach(node => {
      if(this.isTextNode(node)){ //文本
        this.compileText(node)
      }else if(this.isElementNode(node)){ //元素
        this.compileElement(node)
      }
      // 判断node节点，是否有子节点，有就递归
      if(node.childNodes && node.childNodes.length) this.compile(node);
    });
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // console.dir(node.attributes);
    // 遍历所有属性，判断是否是指令 node.attributes是伪数组需要使用Array.from转换一下
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name
      if(this.isDirective(attrName)){
        attrName = attrName.substr(2)
        let key = attr.value
        this.updata(node, key, attrName)
      }
    })
  }
  updata(node, key, attrName) {
    let updatefn = this[attrName+'Updater']
    updatefn && updatefn(node, this.vm[key])
  }

  //处理各种指令，各自去处理各个指令 v-text
  textUpdater(node, val) {
    node.textContent = val
  }
  //处理各种指令 v-model
  modelUpdater(node, val) {
    node.value = val
  }

  // 编译文本，处理差值表达式
  compileText(node) {
    // console.dir(node);
    // {{ msg }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if(reg.test(value)){
      let key = RegExp.$1.trim() //匹配到变量后去除空格
      node.textContent = value.replace(reg, this.vm[key])
    }
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