/**
 * 原型模式:
 * 用于克隆已有的对象，同时又能保证性能
 * 实现了一个原型接口，该接口用于创建当前对象的克隆。
 * 当直接创建对象的代价比较大时，则采用这种模式。
 * 例如：
 *  - 一个对象需要在一个高代价的数据库操作之后被创建。
 *  - 我们可以缓存该对象，在下一个请求时返回它的克隆
 *  - 在需要的时候更新数据库，以此来减少数据库调用。
 * 创建新对象比较复杂时，可以利用原型模式简化对象的创建过程，同时也能提高效率
 * 不用重新初始化对象，而是动态地获得对象运行时的状态
 * 浅拷贝时如果原始对象的引用数据发生变化，其它克隆对象也会发生相应的变化，无需修改代码
 */
class Dress {
    constructor() {
        this.clothing = "";
        this.pants = "";
    }
    clone() {
        const dress = new Dress();
        dress.clothing = this.clothing;
        dress.pants = this.pants;
        return dress;
    }
}
class Person {
    constructor() {
        this.name = "";
        this.age = 0;
        this.sex = 0;
        this.dress = new Dress();
    }
    // 浅拷贝
    shallowClone() {
        let person = new Person();
        person.name = this.name;
        person.age = this.age;
        person.sex = this.sex;
        person.dress = this.dress;
        return person;
    }
    // 深拷贝1
    deepClone() {
        let person = new Person();
        person.name = this.name;
        person.age = this.age;
        person.sex = this.sex;
        person.dress = this.dress.clone();
        return person;
    }
}
// 测试代码
let person = new Person();
person.name = "张三";
person.age = 18;
person.sex = 1;
person.dress.clothing = "白色T恤";
person.dress.pants = "黑色长裤";
let person1 = person.deepClone();
person1.name = "李四";
person1.dress.pants = "牛仔裤";
console.log(person1);
/**
 * 输出：
 * Person {
    name: '李四',
    age: 18,
    sex: 1,
    dress: Dress { clothing: '白色T恤', pants: '牛仔裤' }
    }
 */
console.log(person);
/**
 * 输出：
 * Person {
    name: '张三',
    age: 18,
    sex: 1,
    dress: Dress { clothing: '白色T恤', pants: '黑色长裤' }
    }
 */
// 浅拷贝时如果原始对象的引用数据发生变化，其它克隆对象也会发生相应的变化，无需修改代码
let person2 = person.shallowClone();
person.name = "王五";
person.dress.clothing = "蓝色T恤";
console.log(person);
/**
 * 输出：
 * Person {
    name: '王五',
    age: 18,
    sex: 1,
    dress: Dress { clothing: '蓝色T恤', pants: '黑色长裤' }
    }
 */
console.log(person2);
/**
 * 输出：
 * Person {
    name: '王五',
    age: 18,
    sex: 1,
    dress: Dress { clothing: '蓝色T恤', pants: '黑色长裤' }
    }
 */
