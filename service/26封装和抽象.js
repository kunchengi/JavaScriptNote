// 利用闭包设置私有属性和方法
function User(name, age) {
    // 私有属性
    let _name = name;
    let _age = age;
    // 公有属性
    this.id = 1;
    // 公有方法
    this.getName = function () {
        return _name;
    };
    this.getAge = function () {
        return _age;
    };
    // 私有方法
    function privateMethod() {
        console.log("这是一个私有方法");
    }
}
let user = new User("张三", 20);
console.log(user.getName(), user.getAge());//张三 20