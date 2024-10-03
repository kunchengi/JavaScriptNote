/**
 * @description every方法实现原理，所有元素都满足条件返回true，否则返回false
 * @param 
 * @return void
 * @status public
 */
function every(arr, callback) {
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 遍历数组
    for(let i = 0; i < arr.length; i++)
    {
        // 如果回调函数返回false，则返回false
        if(!callback(arr[i], i, arr))
        {
            return false;
        }
    }
    return true;
}

let arr = [1, 2, 3, 4, 5];

console.log(every(arr, (item, index, arr) => item > 0));
console.log(every(arr, (item, index, arr) => item > 2));
