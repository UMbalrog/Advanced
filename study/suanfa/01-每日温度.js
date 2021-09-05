/**
 * @param {number[]} [73,74,75,71,69,72,76,73]
 * @return {number[]} [1,1,4,2,1,1,0,0]
 */
var dailyTemperatures = function(temperatures) {
  // 利用一个数字递减的栈，每次入栈时比较后一个数字是否大于之前的值，
  // 若大于则将前一个出栈，算出下标，将后一个入栈；
  // 若小于则直接入栈进行下一个比较；
  // 若没有了，则站内的数字都为0；

  let Stack = []; // 递减栈，存入下标 入栈push() 出栈pop()
  let res = new Array(temperatures.length).fill(0); //默认0填充
  temperatures.forEach((element, k) => {
    while(Stack.length > 0) {
      let top = Stack[Stack.length - 1];
      if(temperatures[top] && temperatures[top] < element){
        let index = Stack.pop();
        res[index] = k - index;
      }else{
        break;
      }
    }
    Stack.push(k);
  });
  return res
};

console.log(dailyTemperatures([73,74,75,71,69,72,76,73]))