/**
 * WeakMap 类型
 * 1. WeakMap 类型与 Map 类型的区别
 * 2. WeakMap 对象只接受对象作为键名（null 除外），不接受其他类型的值作为键名
 * 3. WeakMap 对象的键名是弱引用，键值可以是任意的
 * 4. WeakMap 只有 get()、set()、has()、delete()方法
 */
let wm = new WeakMap();
let key = {
    name: "ckc"
};
let value = {
    age: 18
};
wm.set(key, value);
console.log(wm.get(key)); // { age: 18 }
key = null; // 对象 { name: 'ckc' }无引用，会被垃圾回收机制回收掉，所以 WeakMap 会自动删除这个对象值
console.log(wm.get(key)); // undefined
