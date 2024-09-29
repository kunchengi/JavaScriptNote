// 删除属性
const obj = { name: "a", age: 1 };
delete obj.name;
console.log(obj); // { age: 1 }
/**
 * 检测属性是否存在
 * in 运算符用于检测对象是否具有指定属性,包括原型链上的属性
 * hasOwnProperty() 方法用于检测对象是否具有指定属性,不包括原型链上的属性
 */
const obj2 = { name: "a", age: 1 };
console.log("name" in obj2); // true
console.log("toString" in obj2); // true
console.log(obj2.hasOwnProperty("name")); // true
console.log(obj2.hasOwnProperty("toString")); // false
// 设置对象的原型
const obj3 = { name: "a", age: 1 };
const obj4 = { sex: "男" };
// 设置 obj4 的原型为 obj3
Object.setPrototypeOf(obj4, obj3);
// 合并对象
let obj5 = { name: "a" };
let obj6 = { age: 1 };
Object.assign(obj5, obj6);
console.log(obj5); // { name: 'a', age: 1 }
// 获取所有属性名
console.log(Object.keys(obj5)); // [ 'name', 'age' ]
// 获取所有属性值
console.log(Object.values(obj5)); // [ 'a', 1 ]
// 获取所有属性名和属性值
console.log(Object.entries(obj5)); // [ [ 'name', 'a' ], [ 'age', 1 ] ]
// 遍历属性名
for (let key in obj5) {
    console.log(key); // name age
}
// 遍历对象
for(let [key, value] of Object.entries(obj5)) {
    console.log(key, value); // name a age 1
}
// 获取属性的描述，value: 属性值, writable: 是否可修改, enumerable: 是否可以被遍历, configurable: 是否可配置(删除)
const obj7 = { name: "a" , age: 18};
let descriptor = Object.getOwnPropertyDescriptor(obj7, "name");
console.log(descriptor); // { value: 'a', writable: true, enumerable: true, configurable: true }
let descriptors = Object.getOwnPropertyDescriptors(obj7);
console.log(descriptors); // { name: { value: 'a', writable: true, enumerable: true, configurable: true }, age: { value: 18, writable: true, enumerable: true, configurable: true } }
// 修改属性的描述，有则修改，无则添加并设置描述
Object.definePropertie(obj7, "name", { writable: false });
// 修改多个属性的描述
Object.defineProperties(obj7, {
    name: { writable: false },
    age: { writable: false }
});
// 阻止对象扩展，禁止添加属性
Object.preventExtensions(obj7);
// 判断对象是否可扩展
console.log(Object.isExtensible(obj7)); // false
// 封闭对象，禁止添加、删除属性和修改属性的描述
Object.seal(obj7);
// 判断对象是否封闭
console.log(Object.isSealed(obj7)); // true
// 冻结对象，禁止添加、删除、修改属性和修改属性的描述
Object.freeze(obj7);
// 判断对象是否冻结
console.log(Object.isFrozen(obj7)); // true

// create方法创建对象,第一个参数为原型对象，第二个参数为属性描述对象
const obj8 = Object.create({ name: "a" }, { age: { value: 18 } });