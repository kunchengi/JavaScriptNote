/**
 * 类的本质是函数
 */
// 定义类
class User {
    // 定义公有属性public
    _age = 18;
    // 定义静态属性
    static HEART = 1;
    // 构造函数
    constructor(name) {
        this.name = name;
    }
    // 定义普通方法
    sayHi() {
        console.log(this.name);
    }
    // 定义静态方法
    static create(name) {
        return new User(name);
    }
    // 定义存取器
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
}
let user = new User("张三");
user.sayHi();// 张三
console.log(user._age);// 18
console.log(user.age);// 18
let user1 = User.create("李四");
user1.sayHi();// 李四
console.log(User.HEART);// 1


// 类的原理
console.log(typeof User);// function
console.log(User.__proto__ == Function.prototype);// true
// 类会自动把定义的非静态方法添加到原型上
console.log(User.prototype.sayHi);// [Function: sayHi]
// 类的静态方法会添加到类上
console.log(User.create);// [Function: create]
// 类定义的方法不可被遍历
console.log(Object.keys(user));// ['_age', 'name']
console.log(Object.getOwnPropertyDescriptor(User.prototype, 'sayHi'));// {writable: true, enumerable: false, configurable: true, value: ƒ}

// 类的方法默认使用严格模式
class Test {
    test() {
        function test1() {
            console.log(this);
        }
        test1();
    }
}
let test = new Test();
test.test();// undefined

// 使用Symbol定义保护属性protected
let Name = Symbol();
class Animal {
    constructor(name) {
        this[Name] = name;
    }
}
// 继承Animal
class Dog extends Animal {
    constructor(name) {
        // 调用父类的构造函数，继承父类的属性
        super(name);
    }
    // 访问父类的保护属性
    get name() {
        return this[Name];
    }
    set name(value) {
        this[Name] = value;
    }
}
let dog = new Dog("旺财");
// 只能通过get和set方法访问
console.log(dog.name);// 旺财
console.log(dog.Name);// undefined

// 使用WeakMap定义保护属性
let Name1 = new WeakMap();
class Animal1 {
    constructor(name) {
        Name1.set(this, name);
    }
}
class Dog1 extends Animal1 {
    constructor(name) {
        super(name);
    }
    // 访问父类的保护属性
    get name() {
        return Name1.get(this);
    }
    set name(value) {
        Name1.set(this, value);
    }
}
let dog1 = new Dog1("小黑");
console.log(dog1.name);// 小黑
// 实际上外部也能访问，但可以通过模块化不让外部拿到Name1
console.log(Name1.get(dog1));// 小黑

// 定义私有属性private
class Animal2 {
    #name;
    constructor(name) {
        this.#name = name;
    }
    get name() {
        return this.#name;
    }
    set name(value) {
        this.#name = value;
    }
    // 定义私有方法
    #say() {
        console.log("动物叫");
    }
    show() {
        this.#say();
    }
}
class Dog2 extends Animal2 {
    constructor(name) {
        super(name);
    }
}
let animal2 = new Animal2("小黑");
// 私有属性不能被外部访问
// console.log(animal2.#name);// 报错
// 私有方法不能被外部访问
// animal2.#say();// 报错
animal2.show();// 动物叫
let dog2 = new Dog2("小白");
console.log(dog2.name);// 小白
// 私有属性不能被继承
// console.log(dog2.#name);// 报错

// super关键字和方法的重写
class Animal3 {
    constructor(name) {
        this.name = name;
    }
    show() {
        console.log(this.name);
    }
}
class Dog3 extends Animal3 {
    constructor(name) {
        // constructor必须调用super方法，且必须在使用this前调用，否则会报错
        // console.log(this);// 报错
        super(name);
    }
    // 重写父类的方法
    show() {
        // 调用父类的方法
        super.show();
        console.log("狗");
    }
}
let dog3 = new Dog3("小黑");
dog3.show();// 小黑 狗

// 静态方法的继承
class Animal4 {
    static show() {
        console.log("动物");
    }
}
class Dog4 extends Animal4 {
    constructor(name) {
        super(name);
    }
}
console.log(Dog4.__proto__ == Animal4);// true
Dog4.show();// 动物




