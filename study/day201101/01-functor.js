// 函子
const _ = require('lodash');

console.log(_);
class constr{
  static of (fn){
    return new constr(fn);
  }
  constructor(value){
    this._value = value
  }
  map (fn) {
    return constr.of(fn(this._value))
  }
}

// let r = new constr(3).map(x=>x+1).map(x=>x*8);

// console.log(r)