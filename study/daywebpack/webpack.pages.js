const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class MyPlugin {
  apply(compiler) {
    console.log('my Plugin');
    compiler.hooks.emit.tap('myplugin', compilation => {
      let source = compilation.assets;
      for( let name in source){
        // console.log(name);
        if(name.endsWith('.js')){
          let content = source[name].source();
          let content2 = content.replace(/\/\*\*+\*\//g, '');
          source[name] = {
            source: () => content2,
            size: () => content2.length
          }
        }
      }
    })

  }
}


module.exports = {
  // 这个属性有三种取值，分别是 production、development 和 none。
  // 1. 生产模式下，Webpack 会自动优化打包结果；
  // 2. 开发模式下，Webpack 会自动优化打包速度，添加一些调试过程中的辅助；
  // 3. None 模式下，Webpack 就是运行最原始的打包，不做任何额外处理；
  mode:'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      // {
      //   test: /.md$/,
      //   use: './plugin/md-loader.js' //这里也可以直接引用本地地址
      // },
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'] //babel只是一个转换新特性的工具集合，具体使用还要指定插件
            presets: [
              // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
              // ['@babel/preset-env', { modules: 'commonjs' }]
              // ['@babel/preset-env', { modules: false }]
              // 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
              ['@babel/preset-env', { modules: 'auto' }]
            ]
          }
        }
      },
      {
        test:/.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test:/.png$/,
        use: {
          // 限制10kb一下转为base64，其他还是为文件，默认利用file-loader
          loader: 'url-loader',
          options: {
            limit: 10*1024 // 10kb
          }
        }
      }
      // { //打包html时默认加载图片标签下的src的资源，如果要加载其他资源配置attrs属性
      //   test: /.html$/,
      //   use: {
      //     loader: 'html-loader',
      //     options:{
      //       attrs: ['img:src', 'a:href']
      //     }
      //   }
      // }
    ]
  },
  devServer :{
    hot:true,  //模块热替换
    contentBase: './public', // 公共资源目录，可以是数组一个一个找
    proxy: {
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com', //请求的代理地址
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: { //匹配目录替换
          '^/api': ''
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名 设为true后就会以后目标域名及https://api.github.com请求
        changeOrigin: true
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '我是测试页面',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   template: './src/index.html'
    // }),
    // new MyPlugin()
    new webpack.DefinePlugin({
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ],
  optimization: { //配置webpack内部的优化配置的
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: true,
    // --------------
    sideEffects: true //副作用生产模式下会自动开启，开启之后，会先去当前项目的package.json查看当前代码是否有副作用，没有的话，就不会打包儿无用的模块。
  }
}