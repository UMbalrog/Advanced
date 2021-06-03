
function twoSum( numbers ,  target ) {
  let len = numbers.length, obj = {};
  for(let i=0; i<len; i++){
    obj[numbers[i]] = i + 1;
  }
  for(let j=0; j<len; j++){
    let num = target - numbers[j];
    if(obj[num] && obj[num] != (j+1)){
      return [j+1, obj[num]];
    }
  }
}

console.log(twoSum([ 70, 110, 20, 150],90))

function search( nums ,  target ) {
  let len = nums.length;
  if(len <= 0){
    return -1;
  }
  let left = 0;
  let right = len - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left] == target ? left : -1;
}

console.log(search([1,2,4,4,5],4));