const path = require('path');
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
            presets: ['@babel/preset-env'] //babel只是一个转换新特性的工具集合，具体使用还要指定插件
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
  // devServer :{

  // },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '我是测试页面',
      template: './src/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   template: './src/index.html'
    // }),
    // new MyPlugin()
  ]
}