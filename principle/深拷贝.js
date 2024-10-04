/**
 * @description 深拷贝(Json)
 * @param obj 需要拷贝的对象
 * @return void
 * @status public
 */
function deepClone1(obj) 
{
    // 缺陷：
    // 1、无法拷贝函数、undefined、symbol等类型
    // 2、无法拷贝对象原型链
    // 3、无法拷贝对象循环引用的情况
    return JSON.parse(JSON.stringify(obj));
}

const obj = { a: 1, b: 2, c: { d: 3 } , d: [1,2]};
const cloneObj = deepClone1(obj);
// 修改克隆对象，不会影响原对象
cloneObj.c.d = 4;
console.log(cloneObj.c.d);
console.log(obj.c.d);
obj.e = function(){
    console.log('hello');
}
console.log(deepClone1(obj));// 缺少函数、undefined、symbol等类型
obj.d.push(obj.c);
obj.c.j = obj.d;
// const cloneObj1 = deepClone1(obj);// 循环引用，报错

/**
 * @description 深拷贝(递归)
 * @param obj 需要拷贝的对象
 * @param objMap 缓存已经拷贝过的对象，解决循环引用的问题
 * @return void
 * @status public
 */
function deepClone2(obj, objMap = new Map()) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    // 如果对象已经拷贝过，则直接返回
    if (objMap.has(obj)) {
        return objMap.get(obj);
    }
    let isArray = Array.isArray(obj);
    // 初始化新的对象
    const newObj = isArray ? [] : {};
    // 将对象放入缓存
    objMap.set(obj, newObj);
    // 如果是数组，直接遍历
    if(isArray)
    {
        for(let i = 0; i < obj.length; i++)
        {
            newObj[i] = deepClone2(obj[i], objMap);
        }
    }
    else{
        // 获取键名列表，并遍历
        const keys = Object.keys(obj);
        for(let key of keys)
        {
            newObj[key] = deepClone2(obj[key], objMap);
        }
    }
    return newObj;
}

const obj1 = { a: 1, b: 2, c: { d: 3 } , d: [1,2]};
obj1.e = function(){
    console.log('hello');
}
console.log(deepClone2(obj1));// 缺少函数、undefined、symbol等类型
obj1.d.push(obj1.c);
obj1.c.j = obj1.d;
const cloneObj2 = deepClone2(obj1);
console.log(cloneObj2);
