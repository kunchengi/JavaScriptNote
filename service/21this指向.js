/**
 * 定义：当前对象的引用
 * 普通函数的this指向和函数在哪里定义无关，和如何调用有关，谁调用指向谁
 * 箭头函数的this来源于上级作用域，往外找对象，找不到指向window
 * this在全局环境时，指向全局对象（非严格模式、严格模式）
 * this在函数内部时：
 *  1. 直接调用函数，
 *      1. 非严格模式：this指向全局对象（window）
 *      2. 严格模式：this指向undefined
 *  2. 使用对象.的方式调用函数
 *      1. 谁调用，指向谁
 * 修改this指向并执行函数：
 *  1. call
 *      1. 第一个参数为this的指向，指向第一个参数
 *      2. 后面接参数，参数会依次传入
 *  2. apply
 *      1. 第一个参数为this的指向，指向第一个参数
 *      2. 后面接数组，数组会展开，依次传入
 * 修改this指向并返回新函数（不执行）：
 *  1. bind
 *      1. 第一个参数为this的指向，指向第一个参数
 *      3. 后面接参数，参数会依次传入
 */
console.log("this在全局环境时，指向全局对象（非严格模式、严格模式）");
console.log(this);// window
// "use strict"
// console.log(this);// window
console.log("this在函数内部时");
console.log("直接调用函数，非严格模式的this指向window，严格模式的this指向undefined");
function fun() {
    console.log(this);
}
fun();// window

function fun1(){
    "use strict"
    console.log(this);
}
fun1();// undefined
console.log("使用对象.的方式调用函数，指向调用者");
let food = {
    name: '猪脚饭',
    eat() {
        console.log(this);
    }
}
food.eat();// food
let food1 = {
    name: '猪脚饭1',
    eat() {
        "use strict"
        console.log(this);
    }
}
food1.eat();// food

console.log("其他测试");
function foo(a,b,...args) {
    console.log(this);
    console.log(a,b);
    console.log(args);
}
foo(); // window
let obj = {
    name: 'obj',
    foo: foo
}
obj.foo()// obj
let foo1 = obj.foo;
foo1(); // window
let obj2 = {name: 'obj2'}
// call和apply会立即执行函数，bind不会立即执行函数
// call和apply的区别在于参数的传递方式不同，call是一个一个传递，apply是数组传递
// bind会返回一个新函数
obj.foo.apply(obj2,[1,2]); // obj2 1 2 []
obj.foo.call(obj2,1,2); // obj2 1 2 []
let fooBind = obj.foo.bind(obj2,1,2);
fooBind(3,4); // obj2 1 2 [3,4]
function User() {
    this.name = 'user';
    this.foo = function() {
        console.log(this)
    };
}
let user = new User();
user.foo(); // user
// 箭头函数
let foo2 = () => {
    console.log(this)
}
foo2(); // window
function Foo3() {
    this.foo4 = () => {
        console.log(this)
    }
}
let foo3 = new Foo3();
foo3.foo4(); // foo3

//区别
let Lesson = {
    lists: ['js', 'css', 'html'],
    init() {
        this.lists.forEach(function(item) {
            console.log(this);// 这里的this指向window
        })
        this.lists.forEach(item => {
            console.log(this);// 这里的this指向Lesson
        })
    }
}
Lesson.init();


let EventListener = {
    addListener(name, fn) {
        this[name] = fn;
    },
    doEvent(name) {
        this[name]();
    }
}
let Student = {
    name: 'student',
    init() {
        EventListener.addListener('say', () => {
            console.log(this)// student
        })
        EventListener.doEvent('say')
        EventListener.addListener('hi', function() {
            console.log(this)// EventListener
        })
        EventListener.doEvent('hi')
    }
}
Student.init();