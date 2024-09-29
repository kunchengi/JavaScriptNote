// 使用代理控制对象
const web = {name: "百度", url: "http://www.baidu.com"};
const proxy = new Proxy(web, {
    get(obj, key) {
        return obj[key];
    },
    set(obj, key, value) {
        obj[key] = value;
        return true;
    }
});
console.log(proxy.name); // 百度
proxy.name = "谷歌";
console.log(proxy.name); // 谷歌
// 使用代理控制函数
function sum(a, b) {
    return a + b;
}
const sumProxy = new Proxy(sum, {
    apply(fun, thisArg, args) {
        let multiple = thisArg?.multiple ?? 1;
        return fun(...args) * multiple;
    }
});
console.log(sumProxy(1, 2)); // 3
let tripleSum = sumProxy.apply({multiple:3}, [1, 2]);
console.log(tripleSum); // 9
// 使用代理控制数组
const students = [
    {name: "小明", age: 18},
    {name: "小红", age: 19}
];
const studentsProxy = new Proxy(students, {
    get(arr, key) {
        return arr[key];
    },
    set(arr, key, value) {
        arr[key] = value;
        return true;
    }
});
console.log(studentsProxy[0]); // { name: '小明', age: 18 }
studentsProxy[0] = {name: "小刚", age: 20};
console.log(studentsProxy[0]); // { name: '小刚', age: 20 }