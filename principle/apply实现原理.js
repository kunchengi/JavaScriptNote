Function.prototype.myApply = function(obj, args)
{
    if(!obj)
    {
        obj = globalThis;
    }
    const key = Symbol("key");
    obj[key] = this;
    let result = obj[key](...args);
    delete obj[key];
    return result;
}

function add(a, b)
{
    console.log(this);
    return a + b;
}

// 声明一个对象
let obj = {name: "obj"};
let result = add.myApply(obj, [1, 2]);
console.log(result);