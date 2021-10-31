/*
 * @Author: xujie 
 * @Date: 2021-10-28 10:21:15 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-31 18:08:34
 * TCP客户端
 */

const net = require('net');
const MyTransformCode = require('./03-myTransform')

const tc = new MyTransformCode();
let overageBuffer = null;

const client = net.createConnection({
  host: 'localhost',
  port: 8888
});


client.write(tc.encode('TCP测试实例'));
client.write(tc.encode('TCP测试实例1'));
client.write(tc.encode('TCP测试实例2'));
client.write(tc.encode('TCP测试实例3'));
client.write(tc.encode('TCP测试实例4'));


client.on('data', (chunk) => {
  if(overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk]);
    overageBuffer = null;
  }

  let chunkLen = 0;
  while(chunkLen = tc.getPackageLen(chunk)){
    let buffer = chunk.slice(0, chunkLen);
    let str = tc.decode(buffer);
    
    console.log(str.body);
    chunk = chunk.slice(chunkLen);
  }
  overageBuffer = chunk;
})