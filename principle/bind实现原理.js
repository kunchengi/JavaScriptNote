function bind(fn, obj, ...args)
{
    return function(...args2)
    {
        // 执行call函数
        return fn.call(obj, ...args.concat(args2));
    }
}

function add(a, b)
{
    console.log(this);
    return a + b;
}

// 声明一个对象
let obj = {name: "obj"};

let newFn = bind(add, obj, 2, 3);
console.log(newFn());
newFn = bind(add, obj, 2);
console.log(newFn(3));
newFn = bind(add, obj);
console.log(newFn(3, 2));