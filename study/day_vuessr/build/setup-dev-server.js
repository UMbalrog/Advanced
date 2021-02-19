const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const hotMiddleware = require("webpack-hot-middleware");

const resolve = file => path.resolve(__dirname, file);

// const serverBundle = require('./dist/vue-ssr-server-bundle.json');
// const clientManifest = require('./dist/vue-ssr-client-manifest.json');

exports.setupDev = (server, callback) => {
  let ready;
  let promise = new Promise((res, reject) => ready =res);


  let template;
  let serverBundle;
  let clientManifest;
  // 检测文件变化 -> 更新render函数

  const updata = () => {
    if(template && serverBundle && clientManifest){
      callback(serverBundle, template, clientManifest);
      ready();
    }
  }

  // 监视构建 template -> 调用 update -> 更新 Renderer 渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html');
  template = fs.readFileSync(templatePath, 'utf-8');
  updata();
  // fs.watch、fs.watchFile
  chokidar.watch(templatePath).on('change', () => {
    // console.log('改变')
    template = fs.readFileSync(templatePath, 'utf-8');
    updata();
  });

  // 监视构建 serverBundle -> 调用 update -> 更新 Renderer 渲染器
  const serverconfig = require('./webpack.server.config.js');
  const serverCompiler = webpack(serverconfig);
  const serverMiddleware = middleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })

  serverCompiler.hooks.done.tap('buildDone', () => { //构建完成
    serverBundle = JSON.parse(
      serverMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    );
    // console.log(serverBundle);
    updata();
  })  

  // serverCompiler.watch({}, (err, stats) => {
  //   if(err) throw err;
  //   if(stats.hasErrors()) return;
  //   serverBundle = JSON.parse(
  //     fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
  //   );
  //   updata();
  // })
  
  // 监视构建 clientManifest -> 调用 update -> 更新 Renderer 渲染器

  const clientconfig = require('./webpack.client.config.js');
  // 开发模式才使用热更新所以在这里添加热更新配置；
  clientconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientconfig.entry.app = [
    'webpack-hot-middleware/client?quiet=true&reload=true', // 和服务端交互处理热更新一个客户端脚本 quiet 控制台不打印日志，reload某些状态下强制刷新浏览器。
    clientconfig.entry.app
  ];
  clientconfig.output.filename = '[name].js'; // 热更新下资源名字需一致

  const clientCompiler = webpack(clientconfig);
  const clientMiddleware = middleware(clientCompiler, {
    publicPath: clientconfig.output.publicPath, //需要加入公共资源目录
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })
  clientCompiler.hooks.done.tap('clientbuildDone', () => { //构建完成
    clientManifest = JSON.parse(
      clientMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-client-manifest.json'), 'utf-8')
    );
    // console.log(clientManifest);
    updata();
  })

  server.use(hotMiddleware(clientCompiler, {
    log: false // 关闭热更新本身的日志输出
  }));

  // 重要!! 将 clientMiddleware 挂载到 express 服务中，提供对齐内存中数据的访问； 就是让静态资源访问到内存中的。
  server.use(clientMiddleware);
  
  return promise;
}