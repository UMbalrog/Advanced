/*
 * @Author: xujie 
 * @Date: 2021-09-29 14:20:51 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-09-29 15:25:34
 */

const path = require('path');

// console.log(__filename);
// 1、获取路径中的基础名称 

console.log(path.basename(__filename))
console.log(path.basename(__filename, '.js'))
console.log(path.basename(__filename, '.css'))
console.log(path.basename('/a/b/c'))
console.log(path.basename('/a/b/c/'))
console.log('---------**---------');

// 2、获取路径目录名 (路径)

console.log(path.dirname(__filename));
console.log(path.dirname('/a/b/c'))
console.log(path.dirname('/a/b/c/'))

// 3、获取路径的扩展名

console.log(path.extname(__filename));
console.log(path.extname('/a/b/index.html.js.css'));
console.log(path.extname('/a/b/index.html.js.'));
console.log('---------**---------');

// 4、 解析路径
/**
 * 01 接收一个路径，返回一个对象，包含不同的信息
 * 02 root dir base ext name
 */
// let obj = path.parse('/a/b/index.html');
// let obj = path.parse('/a/b/index/');
// let obj = path.parse('./a/b/index.html');
// console.log(obj);

// 5、序列化路径 解析路径的逆向操作
/* 
  接收对象参数，变成路径 root dir base ext name
*/ 
const obj = path.parse('./a/b/index.html')
console.log(path.format(obj))

// 6、判断当前路径是否为绝对

// console.log(path.isAbsolute('foo'))
// console.log(path.isAbsolute('/foo'))
// console.log(path.isAbsolute('///foo'))
// console.log(path.isAbsolute(''))
// console.log(path.isAbsolute('.'))
// console.log(path.isAbsolute('../bar'))

// 7、路径拼接

console.log(path.join('a/b', 'c', 'index.html'));
console.log(path.join('/a/b', 'c', 'index.html'));
console.log(path.join('/a/b', 'c', '../', 'index.html'));
console.log(path.join('/a/b', 'c', './', 'index.html'));
console.log(path.join('/a/b', 'c', '', 'index.html'));
console.log(path.join(''));
console.log('---------**---------');

// 8、规范化路径

console.log(path.normalize('a/b/c/d'));
console.log(path.normalize('a///b/c../d')); //处理不了../
console.log(path.normalize('a\\//b//c\\/d'));
console.log(path.normalize('a\b\c\d'));
console.log(path.normalize(''));
console.log('---------**---------');

// 9、绝对路径

/**
 * 两个参数可以理解为 from 到 to ，from不是必须的
 * resolve([from], to)
 */
console.log(path.resolve())
console.log(path.resolve('/a', 'b'));

// 一般使用就传一个参数
console.log(path.resolve('index.html'));
console.log(path.resolve('../index.html'));