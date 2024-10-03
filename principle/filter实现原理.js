let hd = [1, 2, 3, 4];
/**
 * @description 实现filter方法
 * @param arr 数组
 * @param callback 回调函数
 * @return void
 * @status public
 */
function filter(arr, callback)
{
    if(!Array.isArray(arr) || !(callback instanceof Function))
    {
        throw new Error("参数类型错误");
    }
    // 返回新数组
    let newArr = [];
    // 遍历数组
    for(let i=0;i < arr.length;i++)
    {
        let item = arr[i];
        // 如果回调函数返回true，则添加到新数组中
        if(callback(item, i, arr))
        {
            newArr.push(item);
        }
    }
    // 返回新数组
    return newArr;
}
let newHd = filter(hd, (item,index,hd) => item > 2);
console.log(newHd);// [3, 4]