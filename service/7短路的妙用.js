// 如果前面为真，那么就不会执行后面的代码
let a = 1;
let b = 0;
let c = a || b;
console.log(c); // 1
// 如果前面为假，那么就会执行后面的代码
c = b || a;
console.log(c); // 1
// 重复字符串
"ab".repeat(3); // "ababab"