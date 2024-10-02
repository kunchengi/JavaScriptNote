/**
 * @description 实现call方法
 * @param fn 需要调用的方法
 * @param obj this 指向的对象
 * @param args 传入的参数
 * @return void
 * @status public
 */
function call(fn, obj, ...args)
{
    // 如果obj为null,undefined,则默认为全局对象
    if(!obj)
    {
        // globalThis为es11 的属性，表示全局对象
        obj = globalThis;
    }
    // 为obj添加fn方法
    obj.temp = fn;
    // 调用obj.temp方法,fn里的this指向obj
    let result = obj.temp(...args);
    // 删除obj.temp方法
    delete obj.temp;
    // 返回计算结果
    return result;
}

function add(a, b)
{
    console.log(this);
    return a + b;
}

// 声明一个对象
let obj = {name: "obj"};

let result = call(add, obj, 1, 2);
console.log(result);