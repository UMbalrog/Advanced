const path = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
// 创建web服务器
const app = express();
// 注册处理 history 模式的中间件， 作用是当请求到服务器没有的地址时，都返回指定的index.html文件，再交给前端去判断路由
app.use(history());
// 加载制定地址的静态资源的中间件
app.use(express.static(path.join(__dirname, '../web')));
app.listen(8081, () => {
  console.log('服务器开启，8081');
})
