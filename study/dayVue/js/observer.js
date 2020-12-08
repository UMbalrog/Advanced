/*
  Observer
  --------------
  + walk(data)  //遍历data中的值，并筒处理
  + defineReactive(obj, key, val)  //给属性添加getter和setter
*/ 
class Observer{
  constructor(data){
    this.walk(data)
  }

  walk(data) {
    // 1.判断数据类型兼容错误类型
    if(!data || typeof data !== 'object') return;
    // 2.遍历data的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    const that = this;
    this.walk(val); //这里walk会判断是否对象，对象的话继续递归的往下遍历，这个设计很好。
    Object.defineProperty(obj, key, {
      enumerable: true,  //可遍历
      configurable: true,  //可枚举
      get() { // 注意这里不可使用obj[key], 使用obj[key]就是调用get方法会陷入死循环
        return val
      },
      set(newval) {
        if(newval === val) return;
        val = newval;
        that.walk(newval) //当属性新赋的值对对象时，也要添加getter和setter方法
        // 发送通知
      }
    })
  }
}
