const path = require('path');

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
    ]
  }
}