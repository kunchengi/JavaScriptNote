/**
 * @description 删除数组元素(会修改原数组，并返回被删除的元素数组)
 * @param arr 数组
 * @param args 要删除的元素
 * @return void
 * @status public
 */
function pull(arr, ...args)
{
    // 被删除的元素数组
    let deleteArr = [];
    // 遍历数组
    for (let i = arr.length - 1; i >= 0; i--) {
        // 如果数组元素存在于参数中
        if(args.includes(arr[i]))
        {
            // 添加到被删除的元素数组，并在原数组中删除
            deleteArr.unshift(arr[i]);
            arr.splice(i,1);
        }
    }
    return deleteArr;
}

let arr = [1,2,3,4,5,6,7,8,9];
console.log(pull(arr,1,2,3,9,10));
console.log(arr);

/**
 * @description 删除前面n个数组元素，并返回新数组(不影响原数组)
 * @param arr 数组
 * @param n 要删除的元素个数
 * @return void
 * @status public
 */
function drop(arr, n)
{
    return arr.filter((item, index) => index >= n);
}

let arr2 = [1,2,3,4,5,6,7,8,9];
console.log(drop(arr2,3));// [4,5,6,7,8,9]

/**
 * @description 从后面删除n个元素，并返回新数组(不影响原数组)
 * @param arr 数组
 * @param n 要删除的元素个数
 * @return void
 * @status public
 */
function dropRight(arr, n)
{
    return arr.filter((item, index) => index < arr.length - n);
}

let arr3 = [1,2,3,4,5,6,7,8,9];
console.log(dropRight(arr3,3));// [1,2,3,4,5,6]