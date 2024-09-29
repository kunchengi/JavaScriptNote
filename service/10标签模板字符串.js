let name = "张三";
let age = 18;
let str = `${name}今年${age}岁了`;
console.log(str); // 张三今年18岁了
let str1 = tag`${name}今年${age}岁了`;
function tag(strings, ...values)
{
    console.log(strings); // [ '', '今年', '岁了' ]
    console.log(values); // [ '张三', 18 ]
}