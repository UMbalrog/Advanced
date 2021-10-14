/*
 * @Author: xujie 
 * @Date: 2021-10-14 17:51:58 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-14 18:04:21
 * 自定义，Readable可读流
 */

const { Readable } = require('stream');

const source = ['zhi', 'age', 'name'];

class MyReadable extends Readable{
  constructor(source){
    super()
    this.source = source;
  }
  _read() {
    let data = this.source.shift() || null;
    this.push(data);
  }
}

let myex = new MyReadable(source);
// 暂停模式
myex.on('readable', () => {
  let data = null;
  while((data = myex.read(3)) != null){
    console.log(data.toString());
  }
})

// 流动模式
myex.on('data', (chunk) => {
  console.log(chunk.toString());
})
