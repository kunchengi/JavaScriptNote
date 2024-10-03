/**
 * @description 数组扁平化(递归)
 * @param 
 * @return void
 * @status public
 */
function flatten1(arr)
{
    const newArr = [];
    for(let i = 0; i < arr.length; i++)
    {
        // 判断当前元素是否为数组
        if(Array.isArray(arr[i]))
        {
            // 如果是数组，则递归调用
            newArr.push(...flatten1(arr[i]));
        }
        else
        {
            // 如果不是数组，则直接添加到新数组中
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
/**
 * @description 数组扁平化(while + some + concat)
 * @param 
 * @return void
 * @status public
 */
function flatten2(arr)
{
    // 浅拷贝
    let newArr = [...arr];
    // 循环判断当前数组中是否有数组元素
    while(newArr.some(item => Array.isArray(item)))
    {
        // 使用cancat方法将数组中的元素展开一维，合并到新数组中
        // [].concat(...[1,[2,3]]) = [].concat(1,[2,3]) = [1,2,3]
        newArr = [].concat(...newArr);
    }
    return newArr;
}

const arr = [1,2,[3,4,[5,6],7]]
console.log(flatten2(arr));// [1,2,3,4,5,6]