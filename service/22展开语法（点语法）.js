// 接收不确定个数的参数
function sum(...args) {
    return args.reduce((prev, curr) => prev + curr);
}
console.log(sum(1, 2, 3, 4, 5));// 15
// 展开数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);// [1, 2, 3, 4, 5, 6]
// 展开对象
const obj1 = { name: "a" };
const obj2 = { age: 1 };
const obj3 = { ...obj1, ...obj2};
console.log(obj3);// {name: 'a', age: 1}
// 合并对象属性
const obj4 = { ...obj3, name: "b", sex: "男" };
console.log(obj4);// {name: 'b', age: 1, sex: '男'}
