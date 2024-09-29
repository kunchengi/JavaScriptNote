/**
 * 借用构造函数继承（继承属性）
 * 优点：可以在子类型构造函数中向父类型构造函数传递参数
 * 缺点：无法继承父类型原型上的方法
 */
//父类型
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//子类型
function Student(name, age, sex) {
    //在子类型构造函数中调用父类型构造
    Person.call(this,name,age);
    //上面语句相当于this.Person(name,age)，与下两条注释语句相同
    // this.name = name;
    // this.age = age;
    this.sex = sex;
}
var s = new Student("张三",20,"男");
console.log(s.name,s.age,s.sex);

/**
 * 原型继承（继承方法）
 * 优点：可以继承父类型原型上的方法
 * 缺点：无法向父类型构造函数传递参数
 */
//父类型
function Super1() {
    this.supProp = "Super property";
}
//给父类型的原型添加方法
Super1.prototype.showSuperProp = function () {
  console.log(this.supProp);
};
//子类型
function Sub() {
    this.subProp = "sub property";
}
// 修改构造函数的显示原型的隐式原型为父类型的显示原型，之前创建的实例也会继承
// Sub.prototype.__proto__ = Super1.prototype;
// 之后创建的实例才继承，且要修正构造函数constructor的指向
// Sub.prototype = new Super1();
Sub.prototype = Object.create(Super1.prototype);
//将子类型原型的构造属性设置为子类型
Object.defineProperty(Sub.prototype, 'constructor', {
    value: Sub,
    enumerable: false,// 禁止遍历
    writable: true
});
//给子类型的原型添加方法
Sub.prototype.showSubProp = function () {
    console.log(this.subProp);
};
var sub = new Sub();//创建子类型的对象
sub.showSuperProp();//Super property,可以调用父类型的方法
sub.showSubProp();//sub property,也可以调用自己的方法

/**
 * 组合继承（结合借用构造函数继承和原型链继承）
 * 优点：可以继承父类型构造函数的属性和父类型原型上的方法
 * 缺点：调用了两次父类型构造函数
 */
//父类型
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//给父类型的原型添加方法
Person.prototype.setName = function (name) {
    this.name = name;
};
//子类型
function Student(name, age, sex) {
    //在子类型构造函数中调用父类型构造，为了得到属性
    Person.call(this,name,age);
    //上面语句相当于this.Person(name,age)，与下两条注释语句相同
    // this.name = name;
    // this.age = age;
    this.sex = sex;
}
//子类型的原型等于父类型的实例,不用传参，为了看到父类型的方法
Sub.prototype = new Super1();
Object.defineProperty(Sub.prototype, 'constructor', {
    value: Sub,
    enumerable: false,// 禁止遍历
    writable: true
});
//给子类型的原型添加方法
Student.prototype.setSex = function (sex) {
    this.sex = sex;
};
var s = new Student("张三",20,"男");
s.setSex("女");
s.setName("李四");
console.log(s.name,s.age,s.sex);// 李四 20 女
console.log(s instanceof Person);// true
console.log(s instanceof Student);// true
console.log(s.__proto__ == Student.prototype);// true
console.log(s.__proto__.__proto__ == Person.prototype);// true



