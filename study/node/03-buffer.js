/*
 * @Author: xujie 
 * @Date: 2021-09-29 15:40:12 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-09-29 17:17:01
 * 
 * 创建 Buffer 的方式
 * 1、alloc: 创建指定字节大小的Buffer 
 * 2、allocUnsafe: 创建指定字节大小的Buffer (不安全)
 * 3、from：接收数据 创建Buffer
 * 不推荐使用 new 直接创建
 */

// const b1 = Buffer.alloc(10)
// const b2 = Buffer.allocUnsafe(10)

// console.log(b1);
// console.log(b2);

/*
from 创建时可以传入，字符串、数组、buffer
数组时建议传入十进制的数字
*/ 
// const b1 = Buffer.from('1');
// const b2 = Buffer.from('天');
// 
// const b3 = Buffer.from([1,2,3]);

// console.log(b1);
// console.log(b2)
// console.log(b3)

const b2 = Buffer.from('天')
const b4 = Buffer.from([0xe5,0xa1,0xa9]);


console.log(b2)
console.log(b4)
console.log(b4.toString())
console.log('----------~~---------')

// buffer 不会共享空间修改不影响
const b5 = Buffer.alloc(3);
const b6 = Buffer.from(b5);
b5[0] = 1;
console.log(b5);
console.log(b6);

