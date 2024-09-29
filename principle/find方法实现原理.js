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
    for(let item of arr)
    {
        if(callback(item))
        {
            return item;
        }
    }
    return undefined;
}

let arr = [1,2,3];
console.log(find(arr, item => item > 1)); // 2
console.log(find(arr, item => item > 3)); // undefined
