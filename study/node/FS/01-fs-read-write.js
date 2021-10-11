/*
 * @Author: xujie 
 * @Date: 2021-10-11 18:40:26 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-11 18:58:03
 * 大文件的读写操作
 */

const fs = require('fs');
const path = require('path');

// let buf = Buffer.alloc(10);

// fs.open(path.resolve('data.txt'), 'r', (err, rfd) => {
//   console.log(rfd);
//   /*
//     1、读取文件标识符；
//     2、buf；
//     3、buf 开始写入的位置；
//     4、写入的字符长度；
//     5、要写入的文件字符开始位置；
//   */ 
//   fs.read(rfd, buf, 1, 4, 3, (err, readBytes, data) => {
//     console.log(readBytes);
//     console.log(data);
//     console.log(data.toString());
//   })
// })

let buf = Buffer.from('娃哈哈');

fs.open('b.txt', 'w', (err, wfd) => {
  console.log(wfd);
  /*
    1、读取文件标识符；
    2、buf；
    3、buf 开始读取的位置；
    4、读取的字符长度； 
    5、要读取的文件字符开始位置； 一般为0
  */ 
  fs.write(wfd, buf, 0, 6, 0, (err, writeBytes, data) => {
    console.log(writeBytes);
    console.log(data);
    console.log(data.toString());
  })
})