/**
 * @description 翻转字符串
 * @param {String} str 要翻转的字符串
 * @return void
 * @status public
 */
export function reverseString(str) {
    // 将字符串转换为数组，然后翻转，再转换回字符串
    // return [...str].reverse().join('')
    return str.split('').reverse().join('')
}

// console.log(reverseString('hello'));// olleh