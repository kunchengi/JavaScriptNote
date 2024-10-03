let arr = [1, 2, 3, 4, 3, 5];
/**
 * @description 实现reduce方法
 * @param arr 数组
 * @return void
 * @status public
 */
function reduce(arr, callback, init)
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 如果有初始值，则从0开始，否则从1开始
    let index = init ? 0 : 1;
    // 初始值
    let prev = init ? init : arr[0];
    // 遍历数组
    for(index;index < arr.length;index++)
    {
        // 执行回调函数
        prev = callback(prev, arr[index], index, arr);
    }
    // 返回结果
    return prev;
}
console.log(reduce(arr, (prev, next, index, arr) => prev + next)); // 15
console.log(reduce(arr, (prev, next, index, arr) => {
    if(!prev.includes(next))
    {
        prev.push(next);
    }
    return prev;
}, [])); // [ 1, 2, 3, 4, 5 ]