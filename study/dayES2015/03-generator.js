// Generator 函数

function* Hgenerator(){ //用*号表示 Generator 函数
  console.log('111');
  yield 111;  //用yield可多次返回并且遇到yield就暂停执行，直等到下次在调用
  console.log('222');
  yield 222;
  console.log('333');
  yield 333; 
  return 444 
}
let HG = Hgenerator();
console.log(HG.next()); // 用next方法调用，可以迭代语句调用
console.log(HG.next());
console.log(HG.next());
console.log(HG.next());
console.log(HG.next());


// ECMAScript 2017

const obj = {
  foo: 'value1',
  bar: 'value2'
}

// Object.values -----------------------------------------------------------

// console.log(Object.values(obj))

// Object.entries ----------------------------------------------------------

// console.log(Object.entries(obj))

// for (const [key, value] of Object.entries(obj)) {
//   console.log(key, value)
// }

// console.log(new Map(Object.entries(obj)))

// Object.getOwnPropertyDescriptors ----------------------------------------

// const p1 = {
//   firstName: 'Lei',
//   lastName: 'Wang',
//   get fullName () {
//     return this.firstName + ' ' + this.lastName
//   }
// }
// const p2 = Object.assign({}, p1)
// p2.firstName = 'zce'
// console.log(p2.fullName)

// const descriptors = Object.getOwnPropertyDescriptors(p1)
// const p3 = Object.defineProperties({}, descriptors)
// p3.firstName = 'zce'
// console.log(p3.fullName)

// String.prototype.padStart / String.prototype.padEnd  --------------------

console.log('abc'.padEnd(8, '-'))
console.log('55'.padStart(3, '0'))