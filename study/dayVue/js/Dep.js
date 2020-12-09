/*
  Dep
  ----------
  + subs
  ----------
  + addSub(sub)
  + notify()
*/

class Dep{
  constructor() {
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    sub && sub.upData && this.subs.push(sub)
  }
  // 发布通知观察者
  notify() {
    console.log('发布')
    this.subs.forEach(sub => {
      sub.upData()
    })
  }
}