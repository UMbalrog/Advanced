/*
 * @Author: xujie 
 * @Date: 2021-09-29 17:22:49 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-09-29 18:23:04
 */

// 1、fill
/*
  fill添加会自动充满 buffer 空间
  一共三个参数，后面两个为添加位置，顾前不顾后，[)
*/ 

// const b1 = Buffer.alloc(6);

// b1.fill('1234'); 
// b1.fill('1234', 1, 3);
// b1.fill(114);
// console.log(b1)
// console.log(b1.toString());


// 2、write
/*
  write 写入不会填充
  一共三个参数，后面两个，一个是写入开始位置，一个写入长度
*/ 
// b1.write('114');
// b1.write('114', 3, 2);

// console.log(b1)
// console.log(b1.toString());

// 3、toString
/*
  toString 以不同编码提取数据
  一共三个参数，后面两个是提取位置 开始和结束位置 顾前不顾后
*/ 

// const b2 = Buffer.from('天天快乐')
// console.log(b2)
// console.log(b2.toString());
// console.log(b2.toString('utf-8', 6, 9));

// 4、slice
/*
  slice 截取长度
  一共两个参数，提取位置 开始和结束位置 顾前不顾后
*/ 

// const b2 = Buffer.from('天天快乐')

// console.log(b2.slice().toString())
// console.log(b2.slice(3,8).toString());

// 5、indexOf
/*
  indexOf 查找 返回 buffer下标
  一共两个参数，一个为查找元素，二位开始查找位置
*/ 

// const b2 = Buffer.from('哈哈爱前端，爱，爱大家，我爱所有')

// console.log(b2.indexOf('爱'))
// console.log(b2.indexOf('爱',8));
// console.log(b2.indexOf('爱aa'));

// 6、copy
/*
  copy 拷贝 B.copy(A) //将B拷贝进入A
  一共四个参数，
    一个为拷贝进入的元素，
    二为要考入的A开始写入的位置
    三为被拷贝的开始位置，
    四为被拷贝的结束位置，顾前不顾后
*/ 


// let b2 = Buffer.from('天天快乐')
// let b3 = Buffer.alloc(6)

// b2.copy(b3, 3, 6, 9) //将b2拷贝进入b3

// console.log(b2.toString())
// console.log(b3)
// console.log(b3.toString())

// buffer的静态方法

// concat 拼接 

// let b1 = Buffer.from('拉勾')
// let b2 = Buffer.from('教育')
// 1为数组，合并buffer，2为限制长度
// let b = Buffer.concat([b1, b2], 9)
// console.log(b)
// console.log(b.toString())

//  isBuffer
// let b3 = '123';
// console.log(Buffer.isBuffer(b3))


// split 方法的封装
ArrayBuffer.prototype.split = function(seq) {
  let len = Buffer.from(seq).length;
  let res = [];
  let start = 0;
  let end = 0;
  while(end = this.indexOf(seq, start) !== -1){
    res.push(this.slice(start, end));
    start = end + len;
  }
  ret.push(this.slice(start)); //最后需要截取最后的
  return res;
}

// let buf = Buffer.from('zce吃馒头，吃面条，我吃所有');
let buf = 'zce吃馒头，吃面条，我吃所有吃';  //此处不对
let bufArr = buf.split('吃')
console.log(bufArr);