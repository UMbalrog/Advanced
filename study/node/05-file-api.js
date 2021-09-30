const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve('data1.txt'), (err, data) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data.toString());
//   }
// })

// fs.writeFile('data.txt', '111', {
//   mode: 438,
//   flag: 'w+',
//   encoding: 'utf-8'
// }, (err) => {
//   if(err){
//     console.log(err);
//   }
//   console.log('我写入了')
// })

// copyFile
// fs.copyFile('data.txt', 'test.txt', () => {
//   console.log('复制完成')
// })

// watchFile
fs.watchFile('data.txt', {interval: 20}, (curr, prev) => {
  console.log('文件被修改了');
  if(curr.mtime !== prev.mtime){ //监测是否变化
    fs.unwatchFile('data.txt');
  }
})