const isObject = val => val !== null && typeof val === 'object';
const convert = res => isObject(res) ? reactive(res) : res;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (target, key) => hasOwnProperty.call(target, key);

export function reactive(target) {
  if(!isObject(target)) return target;
  const handler = {
    get(target, key, receiver) { //receiver为生成的代理对象 可以是getter调用时的this
      // 收集依赖
      track(target, key);
      console.log('get', key)
      const res = Reflect.get(target, key, receiver);
      // 如果这个结果是对象，需要继续给这个对象添加响应式；
      return convert(res);
    },
    set(target, key, val, receiver) { //receiver为生成的代理对象
      let oldval = Reflect.get(target, key, receiver);
      let boo = true; //没有变化返回true，默认返回true
      if(oldval !== val) {
        boo = Reflect.set(target, key, val, receiver);
        // 派发依赖
        trigger(target, key)
      }
      return boo
    },
    deleteProperty(target, key) { //删除属性
      let has = hasOwn(target, key); //判断是否有这个属性
      let boo = Reflect.deleteProperty(target, key);
      if(has && boo){
        // 派发依赖
        trigger(target, key)
      }
      return boo
    }
  };
  return new Proxy(target, handler)
}

let activeEffect = null; //全局唯一的，每次执行时都只有一个正在执行，此时收集依赖的对象，就会收集activeEffect正在执行的函数。
export function effect(callback) {
  activeEffect = callback;
  callback(); //访问对象属性，触发收集依赖；
  activeEffect = null; //执行完立即置位空；
}

let targetMap = new WeakMap()
// targetMap 结构
/*
targetMap = {
  target(代理对象) : Map {
    key(代理对象属性) : Set [
      effect中的回调函数，
      effect中的回调函数，
      effect中的回调函数
    ]
  }
}
*/
export function track(target, key) { //收集依赖
  if(!activeEffect) return;
  let depsMap = targetMap.get(target);
  if(!depsMap){
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if(!dep){
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}


export function trigger(target, key) { //派发更新
  const depsMap = targetMap.get(target);
  if(!depsMap) return;
  const dep = depsMap.get(key);
  if(dep) {
    dep.forEach(effect => {
      effect()
    });
  }
}

/* reactive vs ref
- ref 可以把基本数据类型数据，转成响应式对象
- ref 返回的对象，重新赋值成对象也是响应式的
- reactive 返回的对象，重新赋值丢失响应式
- reactive 返回的对象不可以解构
*/ 
export function ref (raw) { //ref函数
  // 判断是否是对象，并且是ref创建的代理对象直接返回
  if(isObject(raw) && raw.__v_isRef) return;
  let value = convert(raw); //如果是对象添加响应式
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value') //收集依赖
      return value
    },
    set value(newVal) {
      if(newVal !== value){
        raw = newVal //赋给原值
        value = convert(raw) //赋给代理值
        trigger(r, 'value')
      }
    }
  }
  return r
}

export function toRefs (proxy) {
  // 判断是否是reactive创建的对象代理器，不是返回
  // 省略
  const ret = proxy instanceof Array ? new Array(proxy.length) : {};
  for(const key in proxy){
    ret[key] = toProxyRef(proxy, key)
  }
  return ret
}
function toProxyRef(proxy, key) {
  return {
    __v_isRef: true,
    get value () {
      return proxy[key] // 这里直接调取，会在proxy的代理对象里在调用get，收集依赖
    },
    set value (newValue) {
      proxy[key] = newValue // 同上这里直接设置
    }
  }
}

export function computed(getter) { // 计算属性，执行effect
  const res = ref();
  effect(() => {res.value = getter()})
  return res;
}