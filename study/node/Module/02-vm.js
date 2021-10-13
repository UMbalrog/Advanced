const fs = require('fs');
const vm = require('vm');
const content = fs.readFileSync('test.txt', 'utf-8');

age = 333;
// eval(content);

vm.runInThisContext('age += 10');

console.log(age);
vm.runInThisContext('console.log("abc")')