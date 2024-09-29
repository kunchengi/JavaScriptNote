// 解构赋值得到数组的元素
let [name1, age] = ["a", 1];
console.log(name1); // a
console.log(age); // 1
// 获取数组中的第一个元素和剩余元素
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [ 2, 3, 4 ]
// 交换两个变量的值
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
// 获取对象中的指定属性
let obj = { name2: "a", age2: 1 };
let { name2, age2 } = obj;
console.log(name2); // a
console.log(age2); // 1
let { name2: name3, age2: age3} = obj;
console.log(name3); // a
console.log(age3); // 1
let name4, age4;
({ name2: name4, age2: age4 } = obj);
console.log(name4); // a
console.log(age4); // 1
// 严格模式中的解构赋值
"use strict";
let name5, age5;
({ name5, age5 } = obj);// Uncaught SyntaxError: Unexpected token '='
// 多层嵌套的解构赋值
let [a1, [b1, c1]] = [1, [2, 3]];
console.log(b1); // 2
let user = {
    name: "a",
    address: {
        city: "beijing"
    }
};
let { name: userName, address: { city } } = user;
console.log(city); // beijing
// 解构赋值的默认值
let [name6 = "a", age6 = 1] = [];
console.log(name6); // a
let { name7 = "a", age7 = 1 } = {};
console.log(age7); // 1