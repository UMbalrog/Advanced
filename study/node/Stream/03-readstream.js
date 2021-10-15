const fs = require('fs');

let rs = fs.createReadStream('text.txt', {
  flags: 'r', // 可读权限
  encoding: null,  // 编码格式
  fd: null, // 标识符 类似id
  mode: 438, // 8进制格式
  autoClose: true,  
  start: 0,
  // end: 3,
  highWaterMark: 4 //缓存区字节个数
})

let bufferArr = [];

rs.on('data', (data) => {
  bufferArr.push(data);
  // console.log(data.toString());
  // rs.pause(); // 暂停
  // setTimeout(() => {
  //   rs.resume(); // 继续启动
  // }, 1000)
})

// rs.on('readable', () => {
//   let data = rs.read();
//   // console.log(data);
//   if(data){
//     console.log(data.toString());
//   }
// })

rs.on('open', (fd) => {
  console.log(fd, '文件打开了');
})

rs.on('close', () => {
  console.log('文件关闭了');
})

rs.on('end', () => {
  console.log(Buffer.concat(bufferArr).toString());
  console.log('数据清空了');
})

rs.on('error', (err) => {
  console.log(err, '异常了');
})
