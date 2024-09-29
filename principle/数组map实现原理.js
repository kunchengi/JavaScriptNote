let arr = [1, 2, 3, 4, 5];
function map(arr, callback)
{
    let newArr = [];
    for(let i=0;i < arr.length;i++)
    {
        let item = arr[i];
        newArr.push(callback(item, i, arr));
    }
    return newArr;
}
console.log(map(arr, (item, index, arr) => item * 2)); // [ 2, 4, 6, 8, 10 ]