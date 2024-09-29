let arr = [1, 2, 3, 4, 3, 5];
function reduce(arr, callback, init)
{
    let index = init ? 0 : 1;
    let prev = init ? init : arr[0];
    for(index;index < arr.length;index++)
    {
        prev = callback(prev, arr[index], index, arr);
    }
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