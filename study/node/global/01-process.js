// 1 资源： cpu 内存
console.log(process.memoryUsage())
console.log(process.cpuUsage())
console.log('--------------------')

// 2 运行环境：运行目录、node环境、cpu架构、用户环境、系统平台
console.log(process.cwd())  // 运行目录
console.log(process.version)  // node 版本
// console.log(process.versions)
console.log(process.arch)  // 平台系统
console.log('--------------------')
console.log(process.env.NODE_ENV) // 环境变量
// console.log(process.env.PATH)  // 系统的环境变量
console.log(process.env.HOME)  // 管理员目录
console.log(process.platform)  // 系统平台

console.log('--------------------')

// 3 运行状态： 启动参数、PID、运行时间
console.log(process.argv)  // 启动参数
console.log(process.argv0)  // execArgv
console.log(process.pid)  // 程序id pid 

setTimeout(() => {
  console.log(process.uptime())  //运行时间
}, 3000)

console.log('--------------------')

// 4、事件
process.on('exit', (code) => {
  console.log('exit', code)
  // 不支持异步代码
});
process.on('beforeExit', (code) => {
  console.log('beforeExit', code)
});
// process.exit(); // 主动退出 //不支持beforeExit
console.log('exit--------------------')

// 5、标准的输入stdin、输出stdout、错误

console.log = function (data) {
  // 输出流，可写流
  process.stdout.write('---' + data + '\n');
}

console.log(11);
console.log(22);
console.log('--------------------')

const fs = require('fs');
fs.createReadStream('test.txt')
  .pipe(process.stdout);

process.stdin.pipe(process.stdout);

console.log( this === global );

(function () {
console.log( this === global )
})();

