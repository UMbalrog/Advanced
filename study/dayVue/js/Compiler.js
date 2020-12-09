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
    updatefn && updatefn.call(this, node, this.vm[key], key)
  }

  //处理各种指令，各自去处理各个指令 v-text
  textUpdater(node, val, key) { 
    // 这里注意this，textUpdater是在updata中调用的，这里的this指向了undefined，所以调用时，要通过call传递this
    node.textContent = val
    // 创建Watcher对象，监听数据变化，跟新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  //处理各种指令 v-model
  modelUpdater(node, val, key) {
    // 这里注意this，modelUpdater是在updata中调用的，这里的this指向了undefined，所以调用时，要通过call传递this
    node.value = val
    // 创建Watcher对象，监听数据变化，跟新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue //这里不会触发input事件所以不会死循环
    })

    // 数据绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })

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
      // 创建Watcher对象，监听数据变化，跟新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
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