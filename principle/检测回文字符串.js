function palindrome(str) {
    // 思路1：翻转字符串，判断是否相等
    // return str.split('').reverse().join('') === str;

    // 思路2：双指针，判断是否相等
    let left = 0;// 左指针
    let right = str.length - 1;// 右指针
    // 指针相遇时，说明是回文字符串，退出循环
    while (left < right) {
        // 不相等，返回false
        if (str[left] !== str[right]) {
            return false;
        }
        left++;// 左指针右移
        right--;// 右指针左移
    }
    return true;
}

console.log(palindrome("abcba"));// true
console.log(palindrome("abcdba"));// false
