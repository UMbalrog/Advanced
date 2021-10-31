/*
 * @Author: xujie 
 * @Date: 2021-10-31 17:27:17 
 * @Last Modified by: xujie
 * @Last Modified time: 2021-10-31 18:07:19
 * 编码器
 * 
 * 编码
 * 解码
 * 获取编码包长度
 */


class MyTransformCode {
  constructor() {
    this.packageHeaderLen = 4; //包儿的头部长度
    this.serialNum = 0; // 每个包儿的编号；
    this.serialLen = 2; // 存储包儿长度的位置；
  }
  // 编码
  encode(data, serialNum) {
    let body = Buffer.from(data);

    let headerBuf = Buffer.alloc(this.packageHeaderLen);
    headerBuf.writeInt16BE(serialNum || this.serialNum);
    if(!serialNum){
      this.serialNum++;
    }
    // writeInt16BE 第一个为写入数据，第二个参数位置；
    headerBuf.writeInt16BE(body.length, this.serialLen);
    return Buffer.concat([headerBuf, body]);
  }
  // 解码
  decode(buffer) {
    const headerBuf = buffer.slice(0, this.packageHeaderLen);
    const body = buffer.slice(this.packageHeaderLen);

    return {
      serialNum: headerBuf.readInt16BE(),
      packageLen: headerBuf.readInt16BE(this.serialLen),
      body: body.toString()
    }
  }
  // 获取包儿的长度
  getPackageLen(buffer) {
    if(buffer.length < this.packageHeaderLen){
      return 0;
    }else{
      return this.packageHeaderLen + buffer.readInt16BE(this.serialLen);
    }
  }
}

module.exports = MyTransformCode