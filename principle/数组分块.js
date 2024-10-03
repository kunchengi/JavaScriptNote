/**
 * @description 数组分块（每size个元素为一块）
 * @param arr 数组
 * @param size 分块大小
 * @return void
 * @status public
 */
function chunk(arr, size = 1) 
{
    // 创建新数组
    const newArr = [];
    // 遍历数组，步长为size
    for (let i = 0; i < arr.length; i += size) {
        // 将当前块添加到新数组中
        let endIndex = (i + size) > arr.length ? arr.length : (i + size);
        newArr.push(arr.slice(i, endIndex));
    }
    return newArr;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(chunk(arr, 3)); // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]


