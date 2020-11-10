// 结合for ... of ...循环

const obj = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['java','node']
}

/* 
 * 使用Symbol.iterator可迭代器封装一下，
 * 一方面是普通对象可遍历
 * 另一方面，为对象添加统一的对外遍历接口，是业务方调用者不用关注对象对数据结构的变化
*/
  
obj[Symbol.iterator] = function(){
  this.alllist = [...this.life, ...this.learn, ...this.work];
  let len = this.alllist.length, index = 0, that = this;
  return { // iterator
    next() { // next方法
      return {
        value: that.alllist[index],
        done: index ++ >= len
      }
    }
  }
};

for(let item of obj){ 
  console.log(item);
}