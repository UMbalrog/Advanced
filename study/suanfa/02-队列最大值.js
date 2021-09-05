class MaxQueue {
  constructor(){
    this.queue = {}; // 正常队列
    this.deque = {}; // 递减的双端队列
    this.countq = this.countd = this.headq = this.headd = 0;
  }
  /**
   * @return {number}
   */
  max_value() {
    if(this.isemptyq()){
      return -1
    }
    return this.deque[this.headd];
  }
  /** 
   * @param {number} value
   * @return {void}
   */
  push_back(value) {
    this.queue[this.countq++] = value;
    while(!this.isemptyd() && value > this.deque[this.countd-1]){
      delete this.deque[--this.countd]
    }
    this.deque[this.countd++] = value;
  }
  /**
   * @return {number}
   */
  pop_front() {
    if(this.isemptyq()){
      return -1
    }
    let dataq = this.queue[this.headq];
    delete this.queue[this.headq++];

    if(this.deque[this.headd] == dataq){
      delete this.deque[this.headd++];
    }
    return dataq;
  }
  isemptyd(){
    return (this.countd - this.headd) === 0;
  }
  isemptyq(){
    return (this.countq - this.headq) === 0;
  }
};

var obj = new MaxQueue()
var param_1 = obj.max_value()
obj.push_back(3)
var param_3 = obj.pop_front()