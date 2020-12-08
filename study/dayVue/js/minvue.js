/*
  Vue
  ----------
  + $options
  + $el
  + $data
  ----------
  - _proxyData() //代理data中的属性，转化为getter和setter，注入到vue实例中
*/ 

class Vue{
  constructor(options){
    // 1、通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = (typeof options.el === 'string') ?  document.querySelector(options.el) : options.el
    // 2、把data中的成员转换为getter和setter注入到vue实例中
    this._proxyData(this.$data)
    // 3、调用observer对象，监听数据的变化
    new Observer(this.$data)
    // 4、调用compiler对象，解析指令和差值表达式
  }

  _proxyData(data) { //data代理器
    // 遍历获取属性，利用Vue实例做数据劫持
    Object.keys(data).forEach(key => {
      // 这里this就是Vue实例
      Object.defineProperty(this, key, {
        enumerable: true, //可遍历
        configurable: true, //可枚举
        get() {
          return data[key]
        },
        set(newval) {
          if(newval === data[key])return;
          data[key] = newval
        }
      })
    })
  }
}