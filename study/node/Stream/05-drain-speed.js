/*
 * @Author: xujie 
 * @Date: 2021-10-15 15:22:46 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-15 15:30:40
 * createWriteStream 控制写入的速度
 */
const fs = require('fs');

let ws = fs.createWriteStream('text.txt', {
  highWaterMark: 3
})

// ws.write('天启熟练度空间');

let source = '天启熟练度空间'.split('');
let num = 0;
let flag = true;

function executeWrite() {
  flag = true;
  while(num < source.length && flag){
    flag = ws.write(source[num++])
  }
}
executeWrite();

ws.on('drain', () => {
  console.log('写入停止。。。');
  executeWrite()
})