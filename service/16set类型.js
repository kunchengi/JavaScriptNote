let hd = new Set("12345");
console.log(hd); // Set { '1', '2', '3', '4', '5' }
let hd2 = new Set([1, 2, 3, 4, 5]);
console.log(hd2); // Set { 1, 2, 3, 4, 5 }
// 并集
let arr1 = [1, 2, 3, 4, 5];
let arr2 = [3, 4, 5, 6, 7];
let union = [...new Set([...arr1, ...arr2])];
console.log(union); // [ 1, 2, 3, 4, 5, 6, 7 ]
// 交集
let intersection = arr1.filter(item => arr2.includes(item));
console.log(intersection); // [ 3, 4, 5 ]
// 差集
let difference = arr1.filter(item => !arr2.includes(item));
console.log(difference); // [ 1, 2 ]