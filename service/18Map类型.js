let map1 = new Map();
map1.set("name", "ckc");
map1.set("age", 18);
// 转换成数组
let arr = Array.from(map1);
console.log(arr); // [ [ 'name', 'ckc' ], [ 'age', 18 ] ]
console.log([...map1]); // [ [ 'name', 'ckc' ], [ 'age', 18 ] ]
