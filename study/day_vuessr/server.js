const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const { setupDev } = require('./build/setup-dev-server')

const server = express();
server.use('/dist', express.static('./dist'))

let renderer;
let onReady;
const isProd = process.env.NODE_ENV === 'production';

if(isProd){ // 生产
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const serverBundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
  });
}else{
  // 检测文件变化，-> 构建打包项目 -> 重新生成renderer渲染器
  onReady = setupDev(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
  });
}

const render = (req, res) => {
  const context = {
    title: '我是title',
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.end(html)
  });
}

// const render = async (req, res) => {
//   try {
//     const html = await renderer.renderToString({
//       title: '我是title',
//       meta: `
//         <meta name="description" content="拉勾教育">
//       `,
//       url: req.url
//     })
//     res.setHeader('Content-Type', 'text/html; charset=utf8')
//     res.end(html)
//   } catch (err) {
//     res.status(500).end('Internal Server Error.')
//   }
// }
// 设为'*'任何请求都会走这里
server.get('*', isProd 
  ? render 
  : async (req, res) => {
    //等待构建完成执行render，利用Promise
    await onReady
    // console.log('开发模式')
    render(req, res)
  }
)

server.listen(3000, (res) => {
  console.log('server running at port 3000...')
})