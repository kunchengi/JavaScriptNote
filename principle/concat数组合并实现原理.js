function concat(arr, ...args) {
    // 先把arr内的元素添加到新数组
    const newArr = [...arr];
    // 遍历其它参数
    for (let i = 0; i < args.length; i++) {
        const item = args[i];
        // 如果当前参数是数组，将数组内的元素添加到新数组
        if (Array.isArray(item)) {
            newArr.push(...item);
        } else {
            newArr.push(item);// 将当前元素添加到新数组
        }
    }
    return newArr;
}

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

console.log(concat(arr1, arr2, arr3, 10));