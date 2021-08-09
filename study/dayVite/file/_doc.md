# 总结

## 1、开发

使用 Composition API  

setup 参数标识
将一个组件代码分在一起；通过各种钩子函数
注意代码的组织

## 2、调试

Vite 会搭建一个本地的服务，当遇到浏览器不能识别的模块如果.vue模块，就在服务里编译文件为浏览器可识别的文件
  
  快速冷启动
  按需编译
  模块热更新

Vite 在生产环境下使用 Rollup 打包，基于 ES Module 的方式打包，打包体积较小

## 3、插件的使用

axios  done
vuex  done
vue-router  done
element-ui


## 4、打包后

- 打包后还是使用 ES 模块引入，要注意浏览器兼容问题;
- 传统浏览器 使用插件 @vitejs/plugin-legacy


## 5、typescript

- vite 支持typescript，但是写法会有影响，会有开发成本，中小项目不建议使用
- 原始 vite创建ts 有问题需要自己解决；

## 6、js库打包

- 增加 build.lib 配置项目 [https://vitejs.cn/guide/build.html#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%A8%A1%E5%BC%8F](https://vitejs.cn/guide/build.html#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%A8%A1%E5%BC%8F)
- 
