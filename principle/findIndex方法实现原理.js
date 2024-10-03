function findIndex(arr, callback) {
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 遍历数组
    for(let i = 0; i < arr.length; i++)
    {
        // 如果回调函数返回true，则返回当前索引
        if(callback(arr[i], i, arr))
        {
            return i;
        }
    }
    // 未找到，返回-1
    return -1;
}

let arr = [1,2,3];
console.log(findIndex(arr, (item, index, arr) => item > 1)); // 1
console.log(findIndex(arr, (item, index, arr) => item > 3)); // undefined