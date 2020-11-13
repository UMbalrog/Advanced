var fn = function (name) {
    console.log(name);
};
fn('100');
var str = 'str';
var arr = [23];
var arr2 = [23];
var post = {
    title: 'Hello World',
    status: 2 /* Comp */ //
};
// 函数类型 
function func1(a, b) {
    if (b === void 0) { b = 10; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return 'func1';
}
func1(23, 10);
// 任意类型  
// any 不会有类型检测
// 隐式类型推断
// 类型断言
var nums = '[110, 120, 119, 112]';
var num1 = nums;
var num2 = nums; // JSX 下不能使用
function printPost(post) {
    console.log(post.title);
    console.log(post.content);
}
var cache = {};
cache.foo = 'value1';
cache.bar = 'value2';
// 类
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}());
