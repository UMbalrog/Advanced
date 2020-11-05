// generator //多次返回的函数

function* add(max){
  let a = 0,
      b = 1,
      n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a+b]
    n++;
  }
}

let r = add(10);
for(let x of r){
  console.log(x);
}
