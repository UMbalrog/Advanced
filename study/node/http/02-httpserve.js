const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // console.log('请求进来了')
  // console.log(req.url);
  // 请求路径
  let {pathname, query} = url.parse(req.url, true)
  console.log(pathname, '----', query)

  // 请求方式
  console.log(req.method)

  // 版本号
  // console.log(req.httpVersion)

  // 请求头
  // console.log(req.headers)

  // 请求体数据获取
  let arr = [];
  req.on('data', (buffer) => {
    console.log(buffer)
    arr.push(buffer)
  });
  req.on('end', () => {
    // console.log(arr)
  })

  // 响应设置
  res.statusCode = 302;
  res.setHeader('Content-type', 'text/html;charset=utf-8');
  res.write('lasdjfiolkd');
  res.end('我是汉子呀呀呀')

})
server.listen(8888, () => {
  console.log('server is start......')
})