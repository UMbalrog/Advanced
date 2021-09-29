const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve('data1.txt'), (err, data) => {
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data.toString());
//   }
// })

fs.writeFile('data.txt', '111', {
  mode: 438,
  flag: 'w+',
  encoding: 'utf-8'
}, (err) => {
  if(err){
    console.log(err);
  }
  console.log('我写入了')
})