// 重复字符串
let str = "HA".repeat(3);
console.log(str); // HAHAHA
// 字符串的长度
console.log(str.length); // 6
// 字符串转大写
console.log(str.toUpperCase()); // HAHAHA
// 字符串转小写
console.log(str.toLowerCase()); // hahaha
// 字符串去除空格
let str1 = "  hello world  ";
console.log(str1.trim()); // "hello world"
// 字符串去除左空格
console.log(str1.trimLeft()); // "hello world  "
// 字符串去除右空格
console.log(str1.trimRight()); // "  hello world"
// 获取指定下标的字符
console.log(str.charAt(1)); // A
console.log(str[1]); // A
// 获取指定字符的下标，第一个参数为要查找的字符，第二个参数为开始查找的下标，如果没有找到返回-1，如果找到返回第一个出现的下标
console.log(str.indexOf("A")); // 1
console.log(str.indexOf("L")); // -1
console.log(str.indexOf("A", 3)); // 3
// 获取指定字符的下标，从后往前查找，第一个参数为要查找的字符，第二个参数为开始查找的下标，如果没有找到返回-1，如果找到返回往前查找第一个出现的下标
console.log(str.lastIndexOf("A")); // 5
console.log(str.lastIndexOf("L")); // -1
console.log(str.lastIndexOf("A", 4)); // 3
// 截取字符串，第一个参数为开始下标，第二个参数为结束下标，不包含结束下标
console.log(str.slice(1, 3)); // AH
// 截取字符串，第一个参数为开始下标，第二个参数为截取长度，不包含结束下标
console.log(str.substr(1, 3)); // AHA
// 截取字符串，第一个参数为开始下标，第二个参数为结束下标，不包含结束下标
console.log(str.substring(1, 3)); // AH
// 替换字符串，第一个参数为要替换的字符，第二个参数为替换成的字符，只替换第一个
console.log(str.replace("A", "B")); // HBHAHA
// 替换字符串，第一个参数为要替换的字符，第二个参数为替换成的字符，替换所有
console.log(str.replace(/A/g, "B")); // HBHBHB
// 字符串转数组，第一个参数为分割字符，第二个参数为分割次数
let arrStr = "1,2,3,4";
console.log(arrStr.split(",")); // [ '1', '2', '3', '4' ]
console.log(arrStr.split(",", 2)); // [ '1', '2' ]
console.log(arrStr.split("")); // [ '1', ',', '2', ',', '3', ',', '4' ]
// 字符串是否包含指定字符，第一个参数为要查找的字符，第二个参数为开始查找的下标，返回true或false
console.log(str.includes("A")); // true
console.log(str.includes("L")); // false
console.log(str.includes("H", 5)); // false
// 字符是否在字符串开头，第一个参数为要查找的字符，第二个参数为开始查找的下标，返回true或false
console.log(str.startsWith("H")); // true
console.log(str.startsWith("A")); // false
console.log(str.startsWith("A", 1)); // true
// 字符是否在字符串结尾，第一个参数为要查找的字符，第二个参数为开始查找的下标，返回true或false
console.log(str.endsWith("A")); // true
console.log(str.endsWith("H")); // false
console.log(str.endsWith("H", 5)); // true
/**
* @description 隐藏电话号码后面几位
* @param phone 电话号码
* @param len 隐藏的位数
* @return void
* @status public
*/
function hidePhoneLast(phone, len) 
{
    return phone.slice(0, -len) + "*".repeat(len);
}
let phone = "13820220905";
console.log(hidePhoneLast(phone, 4)); // 1382022****
/**
* @description 隐藏电话号码前面几位
* @param phone 电话号码
* @param len 隐藏的位数
* @return void
* @status public
*/
function hidePhoneStart(phone, len) 
{
    return "*".repeat(len) + phone.slice(len);
}
console.log(hidePhoneStart(phone, 7)); // *******0905
/**
* @description 隐藏电话号码中间几位
* @param 
* @return void
* @status public
*/
function hidePhoneMiddle(phone, start, len) 
{
    return phone.slice(0, start) + "*".repeat(len) + phone.slice(start + len);
}
console.log(hidePhoneMiddle(phone, 3, 4)); // 138****0905


