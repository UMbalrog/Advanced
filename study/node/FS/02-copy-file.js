/*
 * @Author: xujie 
 * @Date: 2021-10-12 14:25:20 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-12 16:36:34
 * 尝试文件的读取拷贝操作
 */

const fs = require('fs');

const buf = Buffer.alloc(10);
const BUFFER_SIZE = buf.length;
let readSize = 0;

fs.open('data.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'w', (err, wfd) => {
    function next() {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readSize, (err, readBytes, data) => {
        // 停止条件
        if(!readBytes){
          fs.close(rfd, () => {});
          fs.close(wfd, () => {});
          console.log('拷贝完成了');
          return;
        };
        readSize += readBytes;
        fs.write(wfd, buf, 0, readBytes, (err, writeBytes) => {
          next();
        })
  
      })
    }
    next();
  })
})

