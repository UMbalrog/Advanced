function num(arr) {
  let obj = {};
  let len = arr.length;

  for(let i=0; i<len; i++){
    if(!obj[arr[i]]){
      obj[arr[i]] = 1;
    }
  }
  
  return Object.keys(obj);
}

// num([1,12,3,3,2,5,4,5,6]);


function con(value) {
  let arr = [], res = []; // [val, left, right]
  if(!value){
    return res
  }
  arr.push(value);
  while(arr.length > 0){
    let temp = [];
    let len = arr.length;
    for(let i=0; i<len; i++){
      let ele = arr.shift();
      temp.push(ele.val);
      ele.left && arr.push(ele.left);
      ele.right && arr.push(ele.right);
    }
    res.push(temp)
    
  }

  console.log(res);
  return res
}

con({
  val: 1,
  left: {
    val: 2,
    left: {
      val: 5,
      left: null,
      right: null
    },
    right: {
      val: 4,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
})