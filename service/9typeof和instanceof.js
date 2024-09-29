/**
 * typeof 和 instanceof
 * typeof 用于判断基本数据类型
 * instanceof 用于判断引用数据类型
 */
let num = 3;
console.log(typeof num); // number
console.log(num instanceof Number); // false
let str = "3";
console.log(typeof str); // string
console.log(str instanceof String); // false
let bool = true;
console.log(typeof bool); // boolean
console.log(bool instanceof Boolean); // false
let obj = {};
console.log(typeof obj); // object
console.log(obj instanceof Object); // true
let arr = [];
console.log(typeof arr); // object
console.log(arr instanceof Array); // true
let fun = function () {};
console.log(typeof fun); // function
console.log(fun instanceof Function); // true
let nul = null;
console.log(typeof nul); // object
console.log(nul instanceof Object); // false
let und = undefined;
console.log(typeof und); // undefined
let und1;
console.log(typeof und1); // undefined
let sym = Symbol();
console.log(typeof sym); // symbol
let big = BigInt(1);
console.log(typeof big); // bigint


