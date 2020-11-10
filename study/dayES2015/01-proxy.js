// 对象代理器
const per = {
  name: 'zhangsan',
  age: 18
}
const perProxy = new Proxy(per,{
  get(target, prop) {  // 读取监听
    // console.log(target, prop)
    return prop in target ? target[prop] : '默认值'
  },
  set(target, prop, value, ) { // 设置监听
    // console.log(target, prop, value);
    target[prop] = value;
  }
})
// perProxy及为代理对象
perProxy.gender = 23;
console.log(perProxy.abc);