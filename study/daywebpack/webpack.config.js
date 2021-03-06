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
  mode:'none',
  entry: {
    index: './src/main.js',
    about: './src/main1.js'
  },
  output: {
    filename: '[name].bundle.js',
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
  plugins:[
    new HtmlWebpackPlugin({
      title: '我是测试页面',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: '我是测试页面',
      template: './src/about.html',
      filename: 'about.html',
      chunks: ['about']
    }),
  ],
  optimization: {
    splitChunks: {
      // 自动提取所有的公共模块到单独的 bundle中
      chunks: 'all'
    }
  }
}