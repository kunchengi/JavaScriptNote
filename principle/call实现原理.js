/**
 * @description 实现call方法
 * @param fn 需要调用的方法
 * @param obj this 指向的对象
 * @param args 传入的参数
 * @return void
 * @status public
 */
Function.prototype.myCall = function(obj, ...args)
{
    // 如果obj为null,undefined,则默认为全局对象
    if(!obj)
    {
        // globalThis为es11 的属性，表示全局对象
        obj = globalThis;
    }
    // 为obj添加fn方法
    // 使用symbol避免变量名冲突
    const key = Symbol("key");
    obj[key] = this;
    // 调用obj[key]方法,fn里的this指向obj
    let result = obj[key](...args);
    // 删除obj[key]方法
    delete obj[key]
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

let result = add.myCall(obj, 1, 2);
console.log(result);