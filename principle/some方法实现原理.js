/**
 * @description some方法实现原理(只要有一个元素满足条件就返回true)
 * @param 
 * @return void
 * @status public
 */
function some(arr, callback) 
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 遍历数组
    for(let i = 0; i < arr.length; i++)
    {
        // 如果回调函数返回true，则返回true
        if(callback(arr[i], i, arr))
        {
            return true;
        }
    }
    return false;
}

let arr = [1, 2, 3, 4, 5];

console.log(some(arr, (item, index, arr) => item > 5));// false
console.log(some(arr, (item, index, arr) => item > 2));// true