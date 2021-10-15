/*
 * @Author: xujie 
 * @Date: 2021-10-15 15:56:54 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-15 17:56:48
 * 模拟可读文件流
 * MyReadStream
 * 1、继承事件模块，通过事件通知
 * 2、配置传入参数 flags: 'r', // 可读权限
  encoding: null,  // 编码格式
  fd: null, // 标识符 类似id
  mode: 438, // 8进制格式
  autoClose: true,  
  start: 0,
  // end: 3,
  highWaterMark: 4 //缓存区字节个数
  3、实现文件，读取，fs.read 方法，读取入buf 缓存区
  5、提供 data，和readable 事件，传出数据
 */

const fs = require('fs');
const EventsEmitter = require('events');

class MyReadStream extends EventsEmitter{
  constructor(path, options){
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true 
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024 
    this.readOffset = 0;
    
    this.open();
    // 实例注册事件的监听，可以在监听到data事件注册时，读取数据
    this.on('newListener', (type) => {
      if(type == 'data'){
        this.read();
      }
    })
  }
  open() {
    fs.open(this.path, (err, fd) => {
      if(err){
        this.emit('error', err);
        return;
      }
      this.fd = fd;
      this.emit('open', fd);
    })
  }
  read() { //读取数据
    if(typeof this.fd != 'number'){
      return this.once('open', this.read) //监听open触发，再执行read
    }
    let buf = Buffer.alloc(this.highWaterMark);

    let howMuchToRead = this.highWaterMark
    if(this.end) {
      howMuchToRead = Math.min(this.end - this.readOffset + 1, this.highWaterMark);
    }

    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes, data) => {
      if(readBytes){
        this.emit('data', data);
        this.readOffset += readBytes;
        this.read()
      }else{
        this.emit('end')
        this.close()
      }
    })
  }
  close() {
    fs.close(this.fd);
    this.emit('close')
  }
}


let rs = new MyReadStream('text.txt', {
  highWaterMark: 3,
  end: 8
})


rs.on('open', (fd) => {
  console.log(fd, '文件打开了');
})

rs.on('close', () => {
  console.log('文件关闭了');
})

rs.on('data', (chunk) => {
  console.log('数据读取了', chunk.toString())
})

rs.on('end', () => {
  console.log('数据清空了');
})

rs.on('error', (err) => {
  console.log(err, '异常了');
})