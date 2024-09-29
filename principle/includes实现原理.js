/**
* @description 判断数组中是否包含某个元素
* @param target 目标元素
* @param arr 数组
* @return void
* @status public
*/
function includes(target, arr) 
{
    for(let item of arr)
    {
        if(item === target)
        {
            return true;
        }
    }
    return false;
}

let arr = [1,2,3];
console.log(includes(2, arr)); // true
console.log(includes(4, arr)); // false