/**
 * 与 Set 类似，WeakSet 也是一种集合数据结构，但是有两个重要的区别：
 * 1. WeakSet 只能存放对象引用，不能存放值，而 Set 对象都可以。
 * 2. WeakSet 对象中存储的对象值都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
 * 如果没有其他的变量或属性引用这个对象值，那么这个对象将会被垃圾回收机制回收掉（不考虑该对象还存在于 WeakSet 中）。
 * WeakSet只有add()、delete()、has()方法。
 */
let ws = new WeakSet();
let obj = {name: "ckc"};
let foo = {name: "cap"};
ws.add(window);
ws.add(obj);
console.log(ws.has(window)); // true
console.log(ws.has(foo)); // false
console.log(ws.has(obj)); // true
ws.delete(window);
// 弱引用的对象值被垃圾回收机制回收掉了，所以 WeakSet 中已经没有这个对象值了
obj = null;// 对象 {name: "ckc"}无引用，会被垃圾回收机制回收掉，所以 WeakSet 会自动删除这个对象值