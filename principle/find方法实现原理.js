/**
* @description find方法实现原理
* @param {Array} arr 数组
* @param {Function} callback 回调函数
* @return void
* @status public
*/
function find(arr, callback)
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 遍历数组
    for(let i=0;i < arr.length;i++)
    {
        let item = arr[i];
        // 如果回调函数返回true，则返回当前元素
        if(callback(arr[i], i, arr))
        {
            return item;
        }
    }
    // 如果没有找到，则返回undefined
    return undefined;
}

let arr = [1,2,3];
console.log(find(arr, (item, index, arr) => item > 1)); // 2
console.log(find(arr, (item, index, arr) => item > 3)); // undefined