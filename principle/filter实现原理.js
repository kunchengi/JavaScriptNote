let hd = [1, 2, 3, 4];
function filter(arr, callback)
{
    let newArr = [];
    for(let i=0;i < arr.length;i++)
    {
        let item = arr[i];
        if(callback(item, i, arr))
        {
            newArr.push(item);
        }
    }
    return newArr;
}
let newHd = filter(hd, (item,index,hd) => item > 2);
console.log(newHd);// [3, 4]
