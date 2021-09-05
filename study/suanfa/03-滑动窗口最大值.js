/**
 * @param {number[]} nums [1,3,-1,-3,5,3,6,7], 
 * @param {number} k k = 3
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  if(k <= 1){
    return nums
  };
  let queue = []; //递减双端队列
  let res = [];
  nums.forEach((item, i) => {
    if(i < k){
      while(queue.length && item > queue[queue.length - 1]){
        queue.pop();
      }
      queue.push(item);
      if(k-1 == i){
        res.push(queue[0]);
      }
    }else{
      while(queue.length && item > queue[queue.length - 1]){
        queue.pop();
      }
      queue.push(item);
      if(nums[i-k] == queue[0]){
        queue.shift();
      };
      res.push(queue[0]);
    }
  });
  return res;

};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));