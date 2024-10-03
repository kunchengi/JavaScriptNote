/**
* @description 判断数组中是否包含某个元素
* @param searchElement 要搜索的元素
* @param fromIndex 开始搜索的索引
* 如果是正数，从数组中的这个索引位置开始查找，直到数组的末尾。
* 如果是负数，则会从数组的末尾开始向后查找，其中 -1 表示从最后一个元素开始查找。
* @param arr 数组
* @return void
* @status public
*/
function includes(arr, searchElement, fromIndex = 0) 
{
    if(!Array.isArray(arr))
    {
        throw new Error("参数类型错误");
    }
    let i = fromIndex >= 0 ? fromIndex : arr.length + fromIndex;
    for(i; i < arr.length; i++)
    {
        if(arr[i] === searchElement)
        {
            return true;
        }
    }
    return false;
}

let arr = [1,2,3,4,5];
console.log(includes(arr, 2)); // true
console.log(includes(arr, 2, 1)); // true
console.log(includes(arr, 2, 2)); // false
console.log(includes(arr, 4, -2)); // true
// console.log(arr.includes(2,1));// true
// console.log(arr.includes(2,2));// false
// console.log(arr.includes(4,-2));// true
