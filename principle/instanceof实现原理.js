
/**
* @description 判断对象是否属于某个构造函数
* @param left 实例对象
* @param right 构造函数
* @return void
* @status public
*/
function myInstanceof(left, right) 
{
    let rightPrototype = right.prototype; // 获取构造函数的显式原型
    let leftProto = left.__proto__; // 获取实例对象的隐式原型
    while (true) 
    {
        // 说明到原型链顶端，还未找到，返回 false
        if (leftProto === null) {
            return false;
        }
        // 隐式原型与显式原型相等
        if (leftProto === rightPrototype) {
            return true;
        }
        // 获取隐式原型的隐式原型，重新赋值给 leftProto
        leftProto = leftProto.__proto__;
    }
}

let arr = [1,2,3];
console.log(Array.prototype);// 存放Array方法的对象
console.log(Object.prototype);// 存放Object方法的对象
console.log(arr.__proto__ == Array.prototype); // true
console.log(arr.__proto__.__proto__ == Object.prototype); // true
console.log(Array.prototype.constructor == Array);// true
console.log(arr.__proto__.__proto__.__proto__);// null

console.log(myInstanceof(arr, Array)); // true
console.log(myInstanceof(arr, Object)); // true
console.log(myInstanceof(arr, Function)); // false