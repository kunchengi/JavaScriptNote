/**
 * 原型和原型链
 * __proto__是实例对象的隐式原型，指向构造函数的prototype。
 * prototype是构造函数的显式原型，定义了实例对象共享的属性和方法。
 * constructor是prototype的属性，指向构造函数。
 * Function的隐式原型和显式原型相同，指向自身。
 * Object的显式原型的隐式原型是null。
 * 构造函数的隐式原型是Function。
 * 原型链：
 * user = new User():
 * user.__proto__ --> User.prototype
 * User.prototype.__proto__ --> Object.prototype
 * Object.prototype.__proto__ --> null
 * 
 * User.prototype.constructor --> User
 * User.__proto__ --> Function.prototype
 * Function.prototype.__proto__ --> Object.prototype
 * Object.prototype.__proto__ --> null
 * 
 * instanceof 和 isPrototypeOf的区别：
 * instanceof检测对象是否是某个构造函数的实例
 * isPrototypeOf检测对象是否是另一个对象的原型
 * 
 * in和hasOwnProperty的区别：
 * in检测对象是否有某个属性,包括原型链上的属性
 * hasOwnProperty检测对象是否有某个属性,不包括原型链上的属性
 * 
 * 方法不要定义在构造函数中，会导致每次实例化对象都会创建一个新的方法。
 * 方法应该定义在构造函数的显式原型上，实例对象共享一个方法。
 * 
 * 不要在系统的原型上添加方法，会影响到所有的实例对象。
 * 
 * 不建议使用__proto__，建议使用Object.getPrototypeOf()和Object.setPrototypeOf()。
 */
let user = {};// new Object()
// 普通对象的隐式原型是Object的显式原型
console.log(user.__proto__ == Object.prototype);// true
// Object的显式原型的隐式原型是null
console.log(Object.prototype.__proto__);// null
console.log(Object.getPrototypeOf(user) == user.__proto__);// true
// 创建没有原型的对象
let obj = Object.create(null);
console.log(obj.__proto__);// undefined
// 设置user的原型为proto
let proto = {};
// user.__proto__ = proto;
// 建议用setPrototypeOf方法设置对象的原型
Object.setPrototypeOf(user, proto);
console.log(user.__proto__ == proto);// true
function User(name){
    this.name = name;
}
let user1 = new User("张三");
console.log(user1.__proto__ == User.prototype);// true
console.log(User.prototype.constructor == User);// true
console.log(user1.__proto__.__proto__ == Object.prototype);// true
// User的原型是Function
console.log(User.__proto__ == Function.prototype);// true
// Function的隐式原型是Function的显式原型
console.log(Function.__proto__ == Function.prototype);// true
console.log(Function.prototype.__proto__ == Object.prototype);// true
// 给User的原型添加方法
User.prototype.getName = function(){
    return this.name;
}
// user1继承了User的原型方法，可以调用getName方法
console.log(user1.getName());// 张三
let arr = [];// new Array()
console.log(arr.__proto__ == Array.prototype);// true
console.log(Array.__proto__ == Function.prototype);// true

// 原型链继承
function A(){
    this.name = "张三";
}
function B(){
    this.age = 20;
}
// B继承A
B.prototype = new A();
B.prototype.constructor = B;
function C(){
    this.sex = "男";
}
// C继承B
C.prototype = new B();
C.prototype.constructor = C;
function D(){
    this.id = 1;
}
// D继承C
D.prototype = new C();
D.prototype.constructor = D;
let d = new D();
// d的原型链, d.__proto__ --> D.prototype --> C.prototype --> B.prototype --> A.prototype --> Object.prototype --> null

// 封装原型继承
function extend(subType, superType) {
    subType.prototype = Object.create(superType.prototype);
    Object.defineProperty(subType.prototype, 'constructor', {
        value: subType,
        enumerable: false,// 禁止遍历
        writable: true
    });
}

// instanceof检测对象是否是某个构造函数的实例
console.log(d instanceof D);// true
console.log(d instanceof C);// true
console.log(d instanceof B);// true
console.log(d instanceof A);// true
console.log(d instanceof Object);// true

// isPrototypeOf检测对象是否是另一个对象的原型
console.log(D.prototype.isPrototypeOf(d));// true
console.log(C.prototype.isPrototypeOf(d));// true
console.log(B.prototype.isPrototypeOf(d));// true
console.log(A.prototype.isPrototypeOf(d));// true
console.log(Object.prototype.isPrototypeOf(d));// true
let c = new C();
let b = new B();
console.log(c.isPrototypeOf(d));// false
console.log(d.isPrototypeOf(c));// false
console.log(c.__proto__.isPrototypeOf(d));// true

// 属性检测
// in检测对象是否有某个属性,包括原型链上的属性
console.log("name" in d);// true
// hasOwnProperty检测对象是否有某个属性,不包括原型链上的属性
console.log(d.hasOwnProperty("name"));// false
console.log(d.hasOwnProperty("id"));// true

// 给B的原型添加方法
B.prototype.show = function(){
    console.log(this.name);
    
}
// d继承了B的原型方法，可以调用show方法
d.show();// show
// 借用原型链
function E(){
    this.name = "李四";
}
let e = new E();
// 调用show方法时，this指向e
d.show.call(e);// 李四
d.show.apply(e);// 李四

// 不继承Object的方法
let obj1 = Object.create(null);

// 多态: 根据不同的对象调用相同的方法，产生不同的结果
function Animal(){};
Animal.prototype.say = function(){
    console.log("动物叫");
}
function Dog(){};
Dog.prototype.__proto__ = Animal.prototype;
Dog.prototype.say = function(){
    console.log("狗叫");
}
function Cat(){};
Cat.prototype.__proto__ = Animal.prototype;
Cat.prototype.say = function(){
    console.log("猫叫");
}
let animal = new Animal();
let dog = new Dog();
let cat = new Cat();
animal.say();// 动物叫
dog.say();// 狗叫
cat.say();// 猫叫

// 继承父类的属性
function Parent(name){
    this.name = name;
}
function Child(name){
    Parent.call(this,name);
}
let child = new Child("张三");
console.log(child.name);// 张三

// 使用对象工厂实现继承
function createChild(name)
{
    const child = Object.create(Parent.prototype);
    Parent.call(child,name);
    return child;
}
let child1 = createChild("李四");
console.log(child1.name);// 李四

// 使用mixin解决层层继承问题
const retire = {
    getPension(){
        console.log("领退休金");
    } 
}

const study = {
    doTask(){
        console.log("做作业");
    }
}

const eat = {
    doEat(){
        console.log("吃饭");
    }
}
function Human(){};
function Oldie(){};
extend(Oldie, Human);
// 添加需要使用的方法
Oldie.prototype = Object.assign(Oldie.prototype,retire,eat);
let old = new Oldie();
old.doEat();// 吃饭

// super关键字，只能在对象的方法中使用
const parent = {
    name: "张三",
    show(){
        console.log(this.name);
    }
}
const sub = {
    name: "李四",
    __proto__: parent,
    show(){
        // super 指向当前对象的原型，多重继承时，会改变每一层的this指向
        super.show();
        // 同等于
        // super.show.call(this);// 多重继承时，this始终指向当前对象，可能会出现死循环
    },
    // 以下方式使用super会报错
    // show1: function(){
    //     super.show();// 报错
    // }
}
sub.show();// 李四





