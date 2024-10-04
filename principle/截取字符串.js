/**
 * @description 截取字符串,并添加省略号
 * @param str string 截取的字符串
 * @param num number 截取的长度
 * @return void
 * @status public
 */
export function truncate(str, num) {
    return str.slice(0, num) + '...';
}

// console.log(truncate('这是javaScript总结', 5));// 这是jav...