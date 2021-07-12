const path = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const cors = require('cors');
// 创建web服务器
const app = express();
// 注册处理 history 模式的中间件， 作用是当请求到服务器没有的地址时，都返回指定的index.html文件，再交给前端去判断路由
app.use(history());
// 加载制定地址的静态资源的中间件
app.use(express.static(path.join(__dirname, '../web')));

// app.use(cors({
//   origin:['http://localhost:8080'],
//   credentials: true,
//   methods:['GET','POST'],
//   alloweHeaders:['Conten-Type', 'Authorization']
// }));

// node cors跨域

let num = 0;

app.get('/pc/room/*', (req, res) => {
  console.log(req.query);
  
  res.statusCode = 200;
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');
  num++;
  if(num > 2){
    res.send({
      "result": 10000
    })
  }else{
    res.end({
      "result": 10000
    })
  }
  
})

app.listen(3000, () => {
  console.log('服务器开启，3000');
})
