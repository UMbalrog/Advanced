/*
 * @Author: xujie 
 * @Date: 2021-10-28 10:09:10 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-31 18:08:22
 * 创建一个TCP链接
 */

const net = require('net');
const MyTransformCode = require('./03-myTransform')

const tc = new MyTransformCode();
let overageBuffer = null;

const server = net.createServer()

server.listen('8888', 'localhost');

server.on('listening', () => {
  console.log('服务端启动了')
})

server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    // let msg = chunk.toString();
    // console.log(msg);
    if(overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk]);
      overageBuffer = null;
    }

    let chunkLen = 0;
    while(chunkLen = tc.getPackageLen(chunk)){
      let buffer = chunk.slice(0, chunkLen);
      let str = tc.decode(buffer);
      let ack = tc.encode(Buffer.from('哈哈' + str.body));
      console.log(str.body);
      socket.write(ack);

      chunk = chunk.slice(chunkLen);
    }
    overageBuffer = chunk;
   
  });
})

server.on('close', () => {

})

server.on('error', () => {

})