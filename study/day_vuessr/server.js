const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const template = fs.readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

const server = express();

server.use('/dist', express.static('./dist'))
server.get('/', (req, res) => {
  
  renderer.renderToString({
    title: '我是title'
  },(err, html) => {
    // console.log(html);
    if (err) {
      res.status(500).end('Internal Server Error')
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.end(html)
  });
  
})

server.listen(3000, (res) => {
  console.log('server running at port 3000...')
})