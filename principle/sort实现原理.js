/**
* @description sort方法实现原理
* @param {Array} arr 数组
* @param {Function} callback 回调函数
* @return void
* @status public
*/
function sort(arr, callback)
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 冒泡排序
    for(let i = 0; i < arr.length; i++)
    {
        for(let j = i + 1; j < arr.length; j++)
        {
            // 回调函数返回值大于0，交换位置
            if(callback(arr[i], arr[j]) > 0)
            {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
}

let arr = [5,1,3,2,4];
// 升序
sort(arr, (a, b) => a - b);
console.log(arr); // [ 1, 2, 3, 4, 5 ]
// 降序
arr = [1,3,2,5,4];
sort(arr, (a, b) => b - a);
console.log(arr); // [ 5, 4, 3, 2, 1 ]

