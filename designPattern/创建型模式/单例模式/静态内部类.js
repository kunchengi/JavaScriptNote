/**
 * 静态内部类
 *  - js 没有静态内部类的概念
 *  - 例子：
 *      - Singleton类的构造器私有化（js构造器不能私有化）
 *      - SingletonInstance静态内部类有个静态数据 INSTANCE初始值为Singleton类的实例
 *      - getInstance方法直接返回SingletonInstance.INSTANCE
 *  - 这种方式采用了类装载的机制来保证初始化实例时只有一个线程。
 *  - 静态内部类方式在Singleton类被装载时并不会立即实例化,而是在需要实例化时，调用getInstance方法，才去装载SingletonInstance类，从而完成Singleton的实例化。
 *  - 类的静态属性只会在第一次加载类的时候初始化，所以在这里，JVM保证了线程的安全性，在类进行初始化时，别的线程是无法进入的。
 *  - 避免了线程不安全，利用静态内部类特点实现延迟加载，效率高。
 *  - 推荐使用
 */