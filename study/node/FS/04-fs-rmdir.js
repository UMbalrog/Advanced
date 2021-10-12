/*
 * @Author: xujie 
 * @Date: 2021-10-12 17:31:23 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-12 17:51:02
 * 删除目录练习
 */

const fs = require('fs');
const path = require('path');

function myRmDir(dirPath, cb) {
  fs.stat(dirPath, (err, stats) => {
    if(stats.isDirectory()){ //目录
      fs.readdir(dirPath, (err, file) => {
        let files = file.map(item => path.join(dirPath, item));
        console.log(files);
        let index = 0;
        function next() {
          if(index == files.length) {
            return fs.rmdir(dirPath, cb);
          };
          myRmDir(files[index++], next);
        }
        next()
      });
    }else{
      fs.unlink(dirPath, () => {
        cb && cb()
      });
    }
  })
}

myRmDir('temp', () => {
  console.log('删除完成')
});