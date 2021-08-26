# vite总结

[https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)

## 1、Vite的优势

- Vite 会搭建一个本地的服务，当遇到浏览器不能识别的模块如果.vue模块，就在服务里编译文件为浏览器可识别的文件
  
  快速冷启动
  按需编译
  模块热更新

- Vite 在生产环境下使用 Rollup 打包，基于 ES Module 的方式打包，打包体积较小；
- 如果项目需要webpack特有的功能，还需使用vue-cli创建项目；

## 2、开发 

- vite 创建项目

使用 Composition API  
[https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)

setup 参数标识
将一个组件代码分在一起；通过各种钩子函数
- reactive
- ref
- computed
- watch

生命周期钩子
- beforeCreate -> 使用 setup()
- created -> 使用 setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeUnmount -> onBeforeUnmount
- unmounted -> onUnmounted
- errorCaptured -> onErrorCaptured
- renderTracked -> onRenderTracked
- renderTriggered -> onRenderTriggered
- activated -> onActivated
- deactivated -> onDeactivated


注意代码的组织

## 3、打包后

- 打包后还是使用 ES 模块引入，要注意浏览器兼容问题；
- 传统浏览器 使用插件 @vitejs/plugin-legacy


## 4、typescript

- vite 支持typescript，但是写法会有影响，会有开发成本，中小项目不建议使用
- vite创建ts，可以使用

## 5、js库打包

- 增加 build.lib 配置项目 [https://vitejs.cn/guide/build.html#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%A8%A1%E5%BC%8F](https://vitejs.cn/guide/build.html#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%A8%A1%E5%BC%8F)
- 库模式打包，需要结果为vue3版本，与vue2不兼容

## 6、插件的使用

axios  done
vuex  done
vue-router  done
element-ui  done


## 7、 vue3 与 vue2的兼容问题；

- v3 向后兼容，目前v2的项目组件可以直接在vue3项目中使用；
- v2的项目不能添加v3的组件，活动搭建平台问题；


## 8、 v3使用；

- v3 新项目使用；
- v2 老项目不建议升级；

