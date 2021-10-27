const net = require('net');

let serve = net.createServer();
serve.listen('8888', () => {
  console.log('服务端启动了');
})

serve.on('connection', (socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  })
  socket.end('test http request');
})