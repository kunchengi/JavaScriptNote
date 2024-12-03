/**
 * 单例模式：提供getInstance方法返回当前类的实例
 * 1. 整个系统只有一个实例
 * 2. 单例模式保证了系统内存中该类只存在一个对象，节省了系统资源，对于一些需要频繁创建销毁的对象，使用单例模式可以提高系统性能。
 * 3. 当想实例化一个单例类的时候，必须要记住使用相应的获取对象的方法，而不是new
 * 4. 单例模式使用的场景：
 *      - 需要频繁的进行创建和销毁对象,且创建对象时耗时或耗资源较多，但经常使用
 *      - 比如：数据库连接池、线程池、缓存池
 */
/**
 * 饿汉式（静态常量）：在类加载时，就创建一个单例对象
 *  - 例子：
 *      - Singleton类的构造器私有化（js构造器不能私有化）
 *      - instance对象初始值为Singleton类的实例
 *      - getInstance方法直接返回instance对象
 *  - 优点
 *      - 写法简单，在类装载的时候就完成实例化吗，避免了线程同步问题。
 *      - 没有加锁，实例化过程是线程安全的。
 *  - 缺点
 *      - 没有懒加载，在类装载时，就创建了实例，不管用不用，都会占用内存。
 *      - 导致类装载的原因有很多种，因此不能确定有其他的方式(或其它的静态方法)导致类装载
 *  - 可能造成内存浪费
 */
class SingleTon{

    private static instance:SingleTon = new SingleTon();
    private constructor(){

    }
    public static getInstance():SingleTon
    {
        return SingleTon.instance;
    }
}

let instance1 = SingleTon.getInstance();
let instance2 = SingleTon.getInstance();
console.log(instance1 === instance2);

/**
 * 饿汉式（静态代码块）：在类装载时，就执行静态代码块中的代码，创建单例对象
 *  - js 没有静态代码块
 *  - 例子：
 *      - Singleton类的构造器私有化
 *      - instance对象未初始化
 *      - 在静态代码块中，初始化instance对象为Singleton类的实例
 *      - getInstance方法直接返回instance对象
 *  - 优缺点与饿汉式(静态常量)一样，可能造成内存浪费
 */

