/*
类图
VueRouter
-------------
+ options //传入的参数
+ data //VueRouter自身的响应数据
+ routeMap //记录路由地址的组件的关系
-------------
+ Constructor(Options): VueRouter //构造函数
_ install(Vue): void //静态方法注册VueRouter
+ init(): void // 入口方法
+ initEvent(): void // 组成事件监听变化
+ createRouteMap(): void // 创建routeMap对象
+ initComponents(Vue): void // 创建组件<router-link>和<router-view>
*/ 
let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    // 1、判断插件是否安装；
    if(VueRouter.install.installed) return;
    VueRouter.install.installed = true;
    // 2、将vue的构造函数记得到全局变量中，将来在vuerouter的实例中还要使用这个vue的构造函数，比如在创建router-link这些组件时使用Vue.component方法；
    _Vue = Vue
    // 3、把创建的Vue实例时候的传入的router对象注入到所有的Vue实例上，创建$router
    Vue.mixin({
      beforeCreate() {
        if(this.$options.router){ //有这个选项才添加，除去组件
          Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      }
    })
  }

  constructor(options) {
    this.options = options;
    this.routeMap = {};
    // data需要是响应式的对象，通过vue的
    this.data = _Vue.observable({
      current: '/' //当前路径默认根目录
    })
  }

  createRouteMap() {
    // 遍历所有的路由规则 把路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    });
  }

  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent()
  }

  initComponents(Vue) {
    const _that = this;

    Vue.component('router-link', {
      props: {
        to: String
      },
      // 运行时版本Vue，需直接写render函数渲染
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickhandle
          }
        }, [this.$slots.default])
      },
      methods: {
        clickhandle(e){
          // 改变地址栏内容，第一个参数为，触发popstate事件时传入的对象
          history.pushState({}, 'haha', this.to);
          // _that.data.current = this.to; 

          this.$router.data.current = this.to; //记录跳转地址到当前router实例上的data.current属性上，存续当前地址，并且因为data是响应式的，它会自动更新我们的组件；
          e.preventDefault() //阻止默认行为
        }
      }

      // template 需要编译器用完整版Vue，在Vue.config.js中可配置
      // template: '<a :href="to"><slot></slot></a>'
    })

    Vue.component('router-view', {
      render(h) {
        let component = _that.routeMap[_that.data.current];
        return h(component); //直接渲染这个组件
      }
    })
  }

  initEvent() {
    // 这里为了监听点击后退按钮的问题
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname;
    })
  }

}

