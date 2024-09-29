// 接收不确定个数的参数
function sum(...args) {
    return args.reduce((prev, curr) => prev + curr);
}
console.log(sum(1, 2, 3, 4, 5));
// 展开数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);
// 展开对象
const obj1 = { name: "a" };
const obj2 = { age: 1 };
console.log({ ...obj1, ...obj2 });
