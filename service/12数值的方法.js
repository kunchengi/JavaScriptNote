// 判断是否是整数
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(123.0)); // true
console.log(Number.isInteger(123.1)); // false
/**
 * 得到小数点后几位，返回字符串，四舍五入不稳定，不建议使用
 * toFixed的四舍五入并不是我们所认为的四舍五入，而是银行家舍入法，即四舍六入五取偶
 * 舍去位 < 5时，舍
 * 舍去位 > 5时，入
 * 舍去位 = 5时，若前一位为偶数，则舍，否则入
 */
console.log(123.345.toFixed(0)); // 123
console.log(123.345.toFixed(1)); // 123.3
console.log(123.345.toFixed(2)); // 123.34
console.log(123.456.toFixed(0)); // 123
console.log(123.456.toFixed(1)); // 123.5
console.log(123.456.toFixed(2)); // 123.46
// 是否是NaN
// 不能用NaN == NaN来判断是否是NaN
console.log(NaN == NaN); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(123)); // false
console.log(Object.is(NaN, NaN)); // true
// 字符串转数字，如果字符串不是数字，返回NaN
console.log(parseInt("89.7fhjaskdjaksj")); // 89
console.log(parseInt("fhjaskdjaksj")); // NaN
console.log(parseFloat("89.7fhjaskdjaksj")); // 89.7
console.log(parseFloat("fhjaskdjaksj")); // NaN
// 数组转数字，如果数组为空，返回0，如果数组只有一个元素，返回这个元素，如果数组有多个元素，返回NaN
console.log(Number([])); // 0
console.log(Number([1])); // 1
console.log(Number([1, 2])); // NaN
// parseInt转数字只取第一个元素
console.log(parseInt([1, 2])); // 1
// 对象转数字，如果对象有valueOf方法，调用valueOf方法，如果没有，调用toString方法，如果没有，返回NaN
console.log(Number({})); // NaN
console.log(Number({ valueOf: () => 123 })); // 123
console.log(Number({ toString: () => 123 })); // 123
// 取最大值，如果参数不是数字，返回NaN
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.max([1, 2, 3])); // NaN
console.log(Math.max(...[1, 2, 3])); // 3
console.log(Math.max("1", "2", "3")); // 3
console.log(Math.max("1", 2, 3)); // NaN
console.log(Math.max.apply(null, [1, 2, 3])); // 3
// 取最小值
console.log(Math.min(1, 2, 3)); // 1
// 向上取整
console.log(Math.ceil(1.1)); // 2
// 向下取整
console.log(Math.floor(1.9)); // 1
// 四舍五入取整
console.log(Math.round(1.5)); // 2
console.log(Math.round(1.4)); // 1
// 生成随机数，生成0.0 ~ 1.0之间的随机数，不包括1.0
console.log(Math.random()); // 0.0 ~ 1.0
// 生成指定范围的随机数，Math.floor(Math.random() * (max - min + 1)) + min
console.log(Math.floor(Math.random() * 10)); // 0 ~ 9
console.log(Math.floor(Math.random() * 5)); // 0 ~ 4
console.log(Math.floor(Math.random() * 5) + 5); // 5 ~ 9








