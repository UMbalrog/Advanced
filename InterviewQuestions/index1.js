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
      arrl.push(arr[i]);
    }else if(arr[i] < num){
      arrr.push(arr[i]);
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

// console.log(b([1,43,65,56,65,23,12]));

// 转为驼峰式
function cssStyle2DomStyle(sName) {
  return sName.replace(/^-/, '').replace(/-([a-z])/g, (_, $) => {
    return $.toUpperCase()
  });
}

// console.log(cssStyle2DomStyle('font-size-auto'));

// new Promise((reslove, reject) => {
//   // reslove();
//   reject();
// }).then(() => {
//   console.log('reslove1');
// }, () => {
//   console.log('reject');
//   return new Promise((reslove, reject) => {
//     reslove('33');
//     // reject('22');
//   })
// }).catch((err) => {
//   console.log('catch', err);
//   return 'bbbb'
// }).then((res) => {
//   console.log('reslove2', res);
// })

let arr = [];
function Num(totals) {
  totals = Number(totals);
  let integer = Math.floor(totals/200);
  let remainder = totals%200;
  for(let i=0; i<integer; i++){
    arr.push({
      label: (i*200+1) +'--'+ ((i+1)*200),
      value: i+1
    })
  }
  if(remainder > 0){
    let aaa = arr.push({
      label: (integer*200+1) +'--'+ (integer*200+remainder),
      value: integer+1
    })
    console.log(aaa)
  }
  return arr
}
console.log(Num('801'))
