function slice(arr, start, end)
{
    // 设置start和end默认值
    start = start || 0;
    end = end || arr.length;
    // 如果start/end为负数，则从数组末尾开始计算
    start = start >= 0 ? start : (arr.length + start - 1);
    end = end >= 0 ? end : arr.length + end;
    // 数组长度为0，或者start大于数组长度，或者end小于start，返回空数组
    if(arr.length === 0 || start >= arr.length || end < start)
    {
        return [];
    }
    const newArr = [];
    // 遍历数组，将元素添加到新数组中
    for(let i = start; i < end; i++)
    {
        newArr.push(arr[i]);
    }
    return newArr;
}

const arr = [1,2,3,4,5,6,7,8,9];
console.log(slice(arr, 2, 5));// [3,4,5]
console.log(slice(arr, -2));// [7,8,9]
console.log(slice(arr, 2, -2));// [3,4,5,6,7]