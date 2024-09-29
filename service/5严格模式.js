/**
 * 严格模式
 * 使用未声明的变量会报错，不会自动创建全局变量
 * 不能对函数的参数重复命名
 * 不能对只读属性赋值
 */


"use strict";

function test() {
    var a = 1;
    // 使用未声明的变量会报错，不会自动创建全局变量
    //   b = 2; // 报错
    // 函数的this指向undefined,不指向全局对象
    console.log(this);// undefined
}
test();
// 不能对函数的参数重复命名
// function test1(a, a) {// 报错
//     console.log(a);
// }
// 不能对只读属性赋值
var obj = {};
Object.defineProperty(obj, "name", {
    value: "张三",
    writable: false
});
// obj.name = "李四";// 报错