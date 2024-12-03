/**
 * 懒汉式（线程不安全）
 *  - 在JavaScript中，由于其单线程特性，该方式是线程安全的，
 *  - 例子：
 *      - Singleton类的构造器私有化（js构造器不能私有化）
 *      - instance对象未初始化
 *      - getInstance方法中如果instance为空，则创建实例再返回，否则直接返回
 *  - 优点：
 *      - 起到了懒加载的效果，但是只能在单线程下使用。
 *  - 缺点：
 *      - 在多线程下
 *      - 一个线程进入了if(singleton==null)判断语句块，还未来得及往下执行
 *      - 另一个线程也通过了这个判断语句，这时便会产生多个实例。
 *      - 所以在多线程环境下不可使用使用这种方式。
 *  - 在实际开发中，不要使用这种方式
 */
class Singleton1 {
    constructor() {
    }
    static getInstance() {
        if (!Singleton1.instance) {
            Singleton1.instance = new Singleton1();
        }
        return Singleton1.instance;
    }
}
Singleton1.instance = null;
let instance3 = Singleton1.getInstance();
let instance4 = Singleton1.getInstance();
console.log(instance3 === instance4);
/**
 * 懒汉式(线程安全，同步方法)
 *  - js 没有线程同步的机制，无法使用
 *  - 例子：
 *      - Singleton类的构造器私有化（js构造器不能私有化）
 *      - instance对象未初始化
 *      - getInstance方法中加入同步处理的代码synchronized，解决线程安全问题
 *      - 如果instance为空，则创建实例再返回，否则直接返回
 *  - 解决了线程安全问题，但是效率太低。
 *  - 每个线程在想获得类的实例的时候，执行getInstance方法都要进行同步
 *  - 而其实这个方法只执行一次实例化代码就够了，后面的想获得该类的实例，直接return就行了
 *  - 方法进行同步效率太低
 *  - 在实际开发中，不推荐使用这种方式。
 */
/**
 * 懒汉式(线程安全，同步代码块)
 *  - js 没有线程同步的机制，无法使用
 *  - 例子：
 *      - Singleton类的构造器私有化（js构造器不能私有化）
 *      - instance对象未初始化
 *      - getInstance方法中加入同步处理的代码synchronized，解决线程安全问题
 *      - 如果instance为空，使用同步代码块创建实例再返回，否则直接返回
 *  - 与懒汉式(线程安全，同步方法)一样，不推荐使用
 */ 
