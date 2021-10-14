const { Writable } = require('stream');

class MyWritable extends Writable{
  constructor(){
    super()
  }
  _write(chunk, en, cb) {
    process.stdout.write(chunk.toString() + '--------');
    process.nextTick(cb);
  }
}

let Mywr = new MyWritable()

Mywr.write('按理说的结论是', 'utf-8', (err, data) => {
  console.log('写入完成')
})