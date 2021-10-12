/*
 * @Author: xujie 
 * @Date: 2021-10-12 16:46:02 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-12 17:34:13
 */
const fs = require('fs');
const path = require('path');

function makeDirSync (dirPath) {
  let items = dirPath.split(path.sep)
  console.log(items);
  // for(let i = 1; i <= items.length; i++) {
  //   let dir = items.slice(0, i).join(path.sep)
  //   try {
  //     fs.accessSync(dir)
  //   } catch (err) {
  //     fs.mkdirSync(dir)
  //   }
  // }
}

// makeDirSync('a/b/c');

// fs.access('data.txt', (err) => {
//   if(!err){
//     console.log('有权限读取');
//   }
// })

// fs.stat('data.txt', (err, status) => {
//   if(!err){
//     console.log(status.isFile());
//   }
// })


// recursive: true  是否递归
fs.mkdir('temp/b/c', {recursive: true}, (err) => {
  if(!err){
    console.log('创建成功');
  }
})

// recursive: true  是否递归
// fs.rmdir('a', {recursive: true}, (err) => {
//   if(!err){
//     console.log('删除成功');
//   }
// })

// fs.rmdir('a', {recursive: true}, (err) => {
//     if(!err){
//       console.log('删除成功');
//     }
//   })

// 五、readdir 
/* fs.readdir('a/b', (err, files) => {
  console.log(files)
}) */

// 六、unlink
/* fs.unlink('a/a.txt', (err) => {
  if (!err) {
    console.log('删除成功')
  }
}) */