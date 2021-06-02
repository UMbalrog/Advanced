// 快速排序
function a (arr) {
  let len = arr.length;
  if(len <= 1){
    return arr;
  }
  let num = arr[Math.floor(len/2)];
  let arrl = [];
  let arrr = [];
  let arrm = [];
  for(let i=0; i<len; i++){
    if(arr[i] > num ){
      arrr.push(arr[i]);
    }else if(arr[i] < num){
      arrl.push(arr[i]);
    }else{
      arrm.push(arr[i]);
    }
  };
  // console.log(arrl, arrr)
  return a(arrl).concat(arrm, a(arrr));
  
}

// console.log(a([1,43,65,56,65,23,12]));

// 冒泡排序
function b(arr) {
  let len = arr.length;
  let i,j;
  for(i=0; i<len; i++){
    for(j=0; j<(len-1-i); j++){
      if(arr[j] > arr[j+1]){
        let p = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = p;
      }
    }
  }
  return arr;
}

console.log(b([1,43,65,56,65,23,12]));
