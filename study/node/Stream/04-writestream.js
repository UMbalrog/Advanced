const fs = require('fs');

let ws = fs.createWriteStream('text1.txt', {
  flags: 'w',
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 4,
  mode: 438, // 八进制
  fd: null
})

let flag = ws.write('12323', () => {
  console.log('写入完成')
})

let buf = Buffer.from('123')

ws.write(buf, () => {
  console.log('buf写入完成')
})

ws.on('open', (fd) => {
  console.log('open', fd)
})

ws.on('close', (fd) => {
  console.log('close', fd)
})

ws.end('哈哈哈哈')

ws.on('error', (err) => {
  console.log('出错了')
})