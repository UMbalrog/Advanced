/*
  Watcher
  -----------
  + vm
  + key
  + cb
  + oldValue
  -----------
  + upData
 */ 

class Watcher{
  constructor(vm, key, cb) {
    this.vm = vm  // vue实例
    this.key = key // 监听的data属性
    this.cb = cb //回调函数负责跟新视图
    // 将Watcher对象记录到Dep类的tatget静态属性中
    Dep.target = this
    // 触发get方法，在get方法中调用addsub
    this.oldValue = vm[key] //触发get
    // 设置完成后将target至为空
    Dep.target = null
  }

  upData() { //数据变化跟新
    let newValue = this.vm[this.key]
    if(newValue === this.oldValue) return;
    this.oldValue = newValue //替换oldValue
    this.cb && this.cb(newValue)
  }

}
