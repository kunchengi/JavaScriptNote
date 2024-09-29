// 是否是数组类型
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false
console.log(Array.isArray(1)); // false
// 数组转字符串
console.log([1, 2, 3].toString()); // 1,2,3
// 数组转字符串，指定连接符
console.log([1, 2, 3].join()); // 1,2,3
console.log([1, 2, 3].join("")); // 123
console.log([1, 2, 3].join("-")); // 1-2-3
// 伪数组转数组
let arrLike = { 0: "a", 1: "b", 2: "c", length: 3 };
console.log(Array.from(arrLike)); // [ 'a', 'b', 'c' ]
// 合并数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]); // [ 1, 2, 3, 4, 5, 6 ]
console.log(arr1.concat(arr2)); // [ 1, 2, 3, 4, 5, 6 ]，不改变原数组
arr1.push(...arr2);// 会改变原数组
console.log(arr1);// [ 1, 2, 3, 4, 5, 6 ]
// reduce方法实现数组求和，第一个参数为回调函数，第二个参数为初始值
let arr = [1, 2, 3, 4, 3, 5];
console.log(arr.reduce((prev, next) => {
    /**
     * 如果没有初始值
     * 第一次prev为数组第一个元素，往后的prev为上一次回调函数的返回值
     * 第一次next为数组第二个元素，往后的next为数组的下一个元素
     */
    /**
     * 如果有初始值
     * 第一次prev为初始值，往后的prev为上一次回调函数的返回值
     * 第一次next为数组第一个元素，往后的next为数组的下一个元素
     */
    return prev + next;
})); // 15
// 去重
console.log(arr.reduce((prev, next) => {
    if(!prev.includes(next))
    {
        prev.push(next);
    }
    return prev;
}, [])); // [ 1, 2, 3, 4, 5 ]

// 用展开运算符传入不定量参数
function add(...args) 
{
    return args.reduce((prev, next) => prev + next);
}
console.log(add(1, 2, 3, 4, 5)); // 15
// 获取数组处理后的新数组
let arr3 = [1, 2, 3, 4, 5];
console.log(arr3.map((item, index, arr3) => item * 2)); // [ 2, 4, 6, 8, 10 ]
let arr4 = [{name: "a", age: 1}, {name: "b", age: 2}, {name: "c", age: 3}];
console.log(arr4.map(item => item.name)); // [ 'a', 'b', 'c' ]
// 向数组末尾添加一个或多个元素，并返回数组的新长度，会改变原数组
let arr5 = [1, 2, 3];
arr5.push(4);// 返回值为新数组的长度
console.log(arr5); // [ 1, 2, 3, 4 ]
arr5.push(5, 6);
console.log(arr5); // [ 1, 2, 3, 4, 5, 6 ]
// 从数组中删除最后一个元素，并返回该元素的值，会改变原数组
arr5.pop();// 返回值为删除的元素
console.log(arr5); // [ 1, 2, 3, 4, 5 ]
// 向数组的开头添加一个或多个元素，并返回新的长度，会改变原数组
arr5.unshift(0);// 返回值为新数组的长度
console.log(arr5); // [ 0, 1, 2, 3, 4, 5 ]
arr5.unshift(-2, -1);
console.log(arr5); // [ -2, -1, 0, 1, 2, 3, 4, 5 ]
// 从数组中删除第一个元素，并返回该元素的值，会改变原数组
arr5.shift();// 返回值为删除的元素
console.log(arr5); // [ -1, 0, 1, 2, 3, 4, 5 ]
// 截取数组，返回数组的子串，前闭后开,不改变原数组
console.log(arr5.slice(1,3)); // [ 0, 1 ]
console.log(arr5.slice(1)); // [ 0, 1, 2, 3, 4, 5 ]
console.log(arr5.slice(-2)); // [ 4, 5 ]
// 从指定位置开始删除元素，并向数组添加新元素，会改变原数组
// 第一个参数表示开始位置索引，第二个参数表示删除的数
arr5.splice(0, 2);// 返回被删除的元素
console.log(arr5); // [ 1, 2, 3, 4, 5 ]
// 第三个以后表示添加的元素，可用来替换删除的元素
arr5.splice(4, 1, 6, 7);
console.log(arr5); // [ 1, 2, 3, 4, 6, 7 ]
// 插入元素
arr5.splice(4, 0, 5);
console.log(arr5); // [ 1, 2, 3, 4, 5, 6, 7 ]
// 反转数组，会改变原数组
console.log(arr5.reverse()); // [ 7, 6, 5, 4, 3, 2, 1 ]
// 排序数组，会改变原数组
let arr6 = [1, 3, 2, 5, 4];
console.log(arr6.sort()); // [ 1, 2, 3, 4, 5 ]
// 自定义排序，会改变原数组，回调函数返回值大于0，交换位置
let arr7 = [11,4,333,24,8];
// 升序
console.log(arr7.sort((a, b) => a - b)); // [ 4, 8, 11, 24, 333 ]
// 降序
console.log(arr7.sort((a, b) => b - a)); // [ 333, 24, 11, 8, 4 ]
// 创建长度为4的数组，并将每个元素初始化为1
// fill方法会改变原数组
let arr8 = Array(4).fill(1);
console.log(arr8); // [ 1, 1, 1, 1 ]
// 替换数组中的元素
// 第一个参数为替换的元素，第二个参数为开始位置索引，第三个参数为结束位置索引
// 前闭后开，不包括结束位置索引
arr8.fill(2, 1, 3);
console.log(arr8); // [ 1, 2, 2, 1 ]
// 清空数组
arr7 = [];
console.log(arr7); // []
arr8.length = 0;
console.log(arr8); // []
// 复制数组
let arr9 = [1, 2, 3];
let arr10 = arr9.slice();
console.log(arr10); // [ 1, 2, 3 ]
arr10 = [...arr9];
console.log(arr10); // [ 1, 2, 3 ]
arr10 = Array.from(arr9);
console.log(arr10); // [ 1, 2, 3 ]
arr10 = arr9.concat();
console.log(arr10); // [ 1, 2, 3 ]
arr10 = arr9.map(item => item);
console.log(arr10); // [ 1, 2, 3 ]
arr10 = arr9.filter(() => true);
console.log(arr10); // [ 1, 2, 3 ]
// 数组去重
let arr11 = [1, 2, 3, 2, 1];
console.log(Array.from(new Set(arr11))); // [ 1, 2, 3 ]
console.log([...new Set(arr11)]); // [ 1, 2, 3 ]
// 数组过滤
let arr12 = [1, 2, 3, 4, 5];
console.log(arr12.filter((item,index,arr12) => item > 2)); // [ 3, 4, 5 ]
// 找到第一个符合条件的元素,没找到返回undefined
let arr13 = [1, 2, 3, 4, 5, 3];
console.log(arr13.find(item => item > 2)); // 3
// 找到第一个符合条件的元素的索引,没找到返回-1
console.log(arr13.findIndex(item => item < 2)); // 0
// 判断数组中是否包含某个元素
console.log(arr13.includes(3)); // true
console.log(arr13.includes(6)); // false
// 查找元素
console.log(arr13.indexOf(3)); // 2,返回索引
console.log(arr13.indexOf(6)); // -1,不存在返回-1
// 从下标3开始往后查找元素3
console.log(arr13.indexOf(3, 3)); // 5
console.log(arr13.lastIndexOf(3)); // 5,从后往前找
console.log(arr13.lastIndexOf(6)); // -1,不存在返回-1
// 从下标3开始往前查找元素3
console.log(arr13.lastIndexOf(3, 3)); // 2
// 判断数组中是否有元素符合条件
console.log(arr13.some(item => item > 4)); // true
console.log(arr13.some(item => item > 5)); // false
// 判断数组中所有元素是否符合条件
console.log(arr13.every(item => item > 0)); // true
console.log(arr13.every(item => item > 1)); // false
// forEach遍历数组
arr13.forEach((item, index, arr13) => {
    
});
// 迭代器
let arr14 = ["广州", "深圳", "珠海"];
let keys = arr14.keys();// 返回索引的迭代器
console.log(keys.next());// {value: 0, done: false} done为是否结束迭代
let values = arr14.values();// 返回值的迭代器
console.log(values.next());// {value: '广州', done: false}
console.log(values.next());// {value: '深圳', done: false}
console.log(values.next());// {value: '珠海', done: false}
console.log(values.next());// {value: undefined, done: true}
let entries = arr14.entries();
console.log(entries.next());// {value: [0, '广州'], done: false}
// every,全都为真才返回真
// 判断数组中的元素是否都大于等于60
let arr15 = [89, 99, 55];
let res = arr15.every(item => {
    return item >= 60;
})
console.log(res);// false
// some,只有有一个为真就返回真
// 判断数组中的元素是否有小于60的
let res2 = arr15.some(item => {
    return item < 60;
})
console.log(res2);// true












