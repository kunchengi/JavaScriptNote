/**
 * @description 实现new操作符
 * @param {Function} Fn 构造函数
 * @param {Array} args 构造函数参数
 * @return void
 * @status public
 */
export function newInstance(Fn, ...args) {
    // 创建一个新对象
    // 修改函数内部的this指向，并执行
    // 修改原型
    // 返回新对象
    const obj = {};
    let result = Fn.apply(obj, args);
    obj.__proto__ = Fn.prototype;
    // 如果函数的返回值是对象，则返回该对象，否则返回新对象
    return result instanceof Object ? result : obj;
}

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// const p1 = newInstance(Person, "Kenson", 18);
// console.log(p1);