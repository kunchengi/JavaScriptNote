let arr = [1, 2, 3, 4, 5];
/**
 * @description 数组map实现
 * @param arr 数组
 * @param callback 回调函数
 * @return void
 * @status public
 */
function map(arr, callback)
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 返回一个计算好的新数据
    let newArr = [];
    // 遍历原数组
    for(let i=0;i < arr.length;i++)
    {
        let item = arr[i];
        // 回调函数的第一个参数是当前遍历的元素，第二个参数是索引，第三个参数是原数组
        // 执行回调后得到新元素
        let newItem = callback(item, i, arr);
        // 将新元素添加到新数组中
        newArr.push(newItem);
    }
    return newArr;
}
console.log(map(arr, (item, index, arr) => item * 2)); // [ 2, 4, 6, 8, 10 ]