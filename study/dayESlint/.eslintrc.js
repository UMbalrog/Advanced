module.exports = {
  env: {  // 运行环境，前端一般就是browser和node
    browser: true,
    es2021: true
  },  
  extends: [  // 继承现有的代码风格，是数组可以添加多个standard比较火
    'standard'
  ],
  parserOptions: {  //语法解析器的配置
    ecmaVersion: 12,  //设置ECMAScript版本
    sourceType: 'module'  //模块儿加载，ESModules
  },
  rules: { //具体规则的开启
  }
}
