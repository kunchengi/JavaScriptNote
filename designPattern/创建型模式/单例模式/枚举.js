/**
 * 枚举类
 *  - js没有枚举类型，但可以通过类和IIEF实现
 *  - 例子：
 *      - Singleton枚举类有一个INSTANCE属性
 *      - 使用时直接Singleton.INSTANCE
 *  - 不仅能避免多线程同步问题，而且还能防止反序列化重新创建新的对象
 */
class Singleton {
    // 私有构造函数，防止外部实例化
    constructor() {
    }
    someMethod() {
        console.log("someMethod");
    }
}
Singleton.INSTANCE = (function () {
    return new Singleton();
})();
let instance5 = Singleton.INSTANCE;
let instance6 = Singleton.INSTANCE;
console.log(instance5 === instance6);
instance5.someMethod();
