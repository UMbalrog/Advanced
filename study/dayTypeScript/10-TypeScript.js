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
// 假定这个 nums 来自一个明确的接口
var nums = '[110, 120, 119, 112]';
var num1 = nums;
var num2 = nums; // JSX 下不能使用
