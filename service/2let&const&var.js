// let、const有暂时性死区
// console.log(myName); // 报错：ReferenceError: Cannot access 'myName' before initialization
// let myName = "ckc";

// console.log(myName); // 报错：ReferenceError: Cannot access 'myName' before initialization
// const myName = "ckc";

// let myName = "ckc";
// function showName() 
// {
//     // 当前作用域没有let或const的变量，会去上一级作用域查找
//     console.log(myName); // ckc
// }
// showName();

// let myName = "ckc";
// function showName() 
// {
//     // 如果当前作用域中有let或const的变量，那么在声明之前使用这个变量会报错
//     console.log(myName); // 报错：ReferenceError: Cannot access 'myName' before initialization
//     let myName = "ckc2";
// }
// showName();

// let、const不会污染全局变量
// let myName = "ckc";
// console.log(window.myName); // undefined
// const myName = "ckc";
// console.log(window.myName); // undefined

/**
 * 暂时性死区TDC:在声明之前使用这个变量会报错。
 * var、let、const的区别：
 * var: 可以重复声明，没有块级作用域，会变量提升,无暂时性死区。
 * let: 不可以重复声明，有块级作用域，不会变量提升,有暂时性死区，不会污染全局变量。
 * const: 不可以重复声明，有块级作用域，不会变量提升,有暂时性死区，声明时必须赋值,且赋值后不可修改，不会污染全局变量。
 * 声明变量最好使用let和const，不使用var。
 */

// 使用严格模式
// "use strict";