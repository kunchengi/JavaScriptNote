function apply(fn, obj, args)
{
    if(!obj)
    {
        obj = globalThis;
    }
    obj.temp = fn;
    let result = obj.temp(...args);
    delete obj.temp;
    return result;
}

function add(a, b)
{
    console.log(this);
    return a + b;
}

// 声明一个对象
let obj = {name: "obj"};

let result = apply(add, obj, [2, 2]);
console.log(result);