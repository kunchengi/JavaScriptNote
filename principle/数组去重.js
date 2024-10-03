/**
 * @description 数组去重(for + indexOf/includes)
 * @param 
 * @return void
 * @status public
 */
function unique1(arr)
{
    // 返回新数组
    const newArr = [];
    // 遍历数组
    for(let i = 0; i < arr.length; i++)
    {
        // 如果当前元素不在newArr中，则添加
        if(newArr.indexOf(arr[i]) == -1)
        {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
 * @description 数组去重(reduce + indexOf/includes)
 * @param 
 * @return void
 * @status public
 */
function unique2(arr)
{
    return arr.reduce((pre, cur) => {
        // 如果当前元素不在pre中，则添加
        if(pre.indexOf(cur) == -1)
        {
            pre.push(cur);
        }
        return pre;
    }, []);
}

/**
 * @description 数组去重(扩展运算符+Set)
 * @param 
 * @return void
 * @status public
 */
function unique3(arr)
{
    return [...new Set(arr)];
}

/**
 * @description 数组去重(set+from)
 * @param 
 * @return void
 * @status public
 */
function unique4(arr) {
  return Array.from(new Set(arr))
}