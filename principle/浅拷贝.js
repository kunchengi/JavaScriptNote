/**
 * @description 浅拷贝(只拷贝一级属性)
 * @param obj 要拷贝的对象
 * @return void
 * @status public
 */
export function clone(obj) {
    if(!obj || typeof obj !== "object")
    {
        return obj;
    }
    if(Array.isArray(obj))
    {
        return [...obj];
    }
    else 
    {
        return {...obj};
    }
}

/**
 * @description 浅拷贝(es5)
 * @param obj 要拷贝的对象
 * @return void
 * @status public
 */
function clone2(obj) {
    if(!obj || typeof obj !== "object")
    {
        return obj;
    }
    const cloneObj = Arral.isArray(obj) ? [] : {};
    for(let key in obj)
    {
        // 跳过原型链上的属性
        if(!obj.hasOwnProperty(key))
        {
            continue;
        }
        cloneObj[key] = obj[key];
    }
    return cloneObj;
}

// const obj = {
//     name: 'zhangsan',
//     age: 18,
//     address: {
//         city: 'beijing',
//         street: 'changan'
//     }
// }
// const objClone = clone(obj);
// // 修改一级属性，不会影响原对象
// objClone.name = 'lisi';
// console.log(objClone.name);
// console.log(obj.name);
// // 修改二级属性，会影响原对象
// objClone.address.city = 'shanghai';
// console.log(objClone.address.city);
// console.log(obj.address.city);

// const arr = [1,2,3,[4,5,6]];
// const arrClone = clone(arr);
// // 修改一级属性，不会影响原对象
// arrClone[1] = 99;
// console.log(arrClone[1]);
// console.log(arr[1]);
// // 修改二级属性，会影响原对象
// arrClone[3][1] = 999;
// console.log(arrClone[3][1]);
// console.log(arr[3][1]);