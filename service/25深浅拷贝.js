// 浅拷贝
let user = {name: "a", age: 1, alias:["b", "c"]};
let copyUser = Object.assign({}, user);// assign
let copyUser2 = {...user};// 扩展运算符
let copyUser3 = Object.create(user);// create
let copyUser4 = {};// for in
for (let key in user) {
    copyUser4[key] = user[key];
}
// 修改拷贝对象的值类型属性，不会影响原对象
copyUser.name = "b";
console.log(user.name);// a
// 修改拷贝对象的引用类型属性，会影响原对象
copyUser.alias.push("d");
console.log(user); // { name: 'a', age: 1, alias: [ 'b', 'c', 'd' ] }

// 深拷贝
let user2 = {name: "a", age: 1, alias:["b", "c"], child: {name: "d"}};
let copyUser5 = JSON.parse(JSON.stringify(user2));// JSON
copyUser5.child.name = "e";
console.log(user2.child.name);// d
function deepClone(obj) {
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
    return newObj;
}
let copyUser6 = deepClone(user2);
copyUser6.child.name = "e";
copyUser6.alias.push("d");
console.log(user2); // { name: 'a', age: 1, alias: [ 'b', 'c' ], child: { name: 'd' } }

let arr = [1, 2, 3];
console.log(typeof arr);// object
for(let key in arr) {
    console.log(key);// 0 1 2
}
