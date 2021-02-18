const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

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
  const config = require('./webpack.server.config.js');
  const serverCompiler = webpack(config);
  const serverMiddleware = middleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })

  serverCompiler.hooks.done.tap('buildDone', () => { //构建完成
    serverBundle = JSON.parse(
      serverMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    );
    console.log(serverBundle);
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

  const config = require('./webpack.server.config.js');
  const serverCompiler = webpack(config);
  const serverMiddleware = middleware(serverCompiler, {
    logLevel: 'silent' // 关闭日志输出，由 FriendlyErrorsWebpackPlugin 处理
  })

  serverCompiler.hooks.done.tap('buildDone', () => { //构建完成
    serverBundle = JSON.parse(
      serverMiddleware.fileSystem.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
    );
    console.log(serverBundle);
    updata();
  })  

  
  return promise;
}