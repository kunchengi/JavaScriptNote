// 先写一个简单的例子
console.log(myName); // undefined
console.log(myAge); // undefined
var myName = "ckc";
var myAge = 18;
console.log(myName); // ckc
console.log(myAge); // 18

// // 在解析过程中浏览器会先声明当前作用域的所有变量
// var myName;
// var myAge;

// // 然后再按顺序执行以下代码
// console.log(myName); // undefined
// console.log(myAge); // undefined
// myName = "ckc";
// myAge = 18;
// console.log(myName); // ckc
// console.log(myAge); // 18
