Function.prototype.myBind = function(obj, ...args)
{
    return (...args2)=>
    {
        return this.call(obj, ...args, ...args2);
    }
}

function add(a, b)
{
    console.log(this);
    return a + b;
}

// 声明一个对象
let obj = {name: "obj"};

let newFn = add.myBind(obj, 2, 3);
console.log(newFn());
newFn = add.myBind(obj, 2);
console.log(newFn(3));
newFn = add.myBind(obj);
console.log(newFn(3, 2));