/**
 * 环境的存在价值是被依赖，不被依赖的环境会被回收
 * 全局环境不会被回收
 */
/**
 * 函数的作用域是在函数被调用时创建的。
 * 当函数被调用时，会为该函数创建一个新的执行上下文（Execution Context）
 * 该上下文包含了函数的作用域链、变量环境和 this 绑定等信息。
 * 函数定义时：
 * 当一个函数被定义时，JavaScript 引擎会保存其外部环境的引用。
 * 这意味着函数定义时的词法作用域（Lexical Scope）已经确定，包括函数可以访问的所有外部变量。
 * 函数调用时：
 * 当函数被调用时，会创建一个新的执行上下文。
 * 在这个新的执行上下文中，函数的作用域链被初始化。
 * 这个作用域链包括：
 * 当前函数的变量对象（包含该函数的参数、局部变量等）。
 * 函数定义时的外部环境的引用。
 */
function outer() {
    let outerVar = 'I am outside!';

    function inner() {
        let innerVar = 'I am inside!';
        console.log(outerVar); // 可以访问到 outerVar
    }

    inner(); // 调用 inner 函数，创建 inner 的执行上下文
}
outer(); // 调用 outer 函数，创建 outer 的执行上下文
/**
 * 作用域链是在函数定义时确定的，而不是在函数调用时确定的。
 * 这是因为 JavaScript 使用词法作用域（Lexical Scoping），也叫静态作用域（Static Scoping）。
 * 当定义一个函数时，JavaScript 会创建一个闭包，并保存函数定义时所在的作用域链。
 * 这意味着函数内部对变量的引用会沿着定义时的作用域链向上查找，而不是调用时的作用域链。
 */
function outer1() {
    let a = 1;

    function inner1() {
        console.log(a);
    }
    // 返回 inner 函数, 但不执行S
    return inner1;
}
// 执行 outer 函数，此时fn指向 inner 函数
let fn1 = outer1();
let a = 2;
// 即使在fn执行前，全局环境中已经存在变量a，但fn执行时，依然会沿着定义时的作用域链向上查找
fn1(); // 1 
/**
 * 闭包: 一个函数和它的词法作用域的组合
 * 产生闭包的条件
 * 1. 函数嵌套：在一个函数内部定义另一个函数。
 * 2. 内部函数引用了外部函数的数据（变量/函数）
 */
function outer2() {
    let a = 1;
    function inner2() {
        console.log(++a);
    }
    return inner2;
}
// 每次调用 outer2 函数，都会创建一个新的执行上下文，其中包含了一个新的变量 a
let fn2 = outer2();
fn2(); // 2
fn2(); // 3
let fn3 = outer2();
fn3(); // 2
// 在构造函数中使用闭包
function Counter() {
    let count = 0;
    this.increment = function() {
        console.log(++count);
    }
}
let counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
// 块作用域的for循环
/**
 * 以下循环的i是全局变量，先执行for循环，i的值变为3
 * 然后1000后执行setTimeout，此时i的值为3
 * 因此会输出3个3
 */
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
/**
 * 使用let声明变量，会创建一个块级作用域
 * 定时器中的i是块级作用域中的变量
 * 每次循环都会创建一个新的块级作用域
 * 因此会输出0、1、2
 */
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
// 利用闭包解决循环中的异步问题
/**
 * 每次循环都会创建一个新的匿名函数作用域
 * 匿名函数的参数i保存了当前循环的i的值
 * setTimeout执行时使用的是匿名函数作用域中的i
 * 因此会输出0、1、2
 */
for (var i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    })(i);
}
/**
 * 函数柯里化：
 * 将一个多参数的函数转换为一系列单参数函数的过程
 * 即逐步接收函数的参数，每次接收一个参数并返回一个新的函数，直到所有参数都被接收完毕，然后返回最终的结果。
 * 柯里化的主要好处：
 * 代码重用：可以创建新的函数，通过部分应用参数来复用已有函数。
 * 延迟执行：可以在某个时刻传递部分参数，然后在稍后的时刻传递剩余的参数并执行。
 * 提高代码可读性：将复杂的多参数函数分解成多个简单的单参数函数，使代码更易理解和维护。
 */
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// 使用方法
function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 输出 24
console.log(curriedMultiply(2, 3)(4)); // 输出 24
console.log(curriedMultiply(2)(3, 4)); // 输出 24

// 使用闭包实现函数柯里化
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function between(min, max) {
    return function(num) {
        return num >= min && num <= max;
    }
}
arr.filter(between(3, 8)); // [3, 4, 5, 6, 7, 8]