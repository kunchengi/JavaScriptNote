const HOST = {
    url : 'http://www.baidu.com',
    port : 80
};
HOST.url = 'http://www.google.com';
console.log(HOST.url); // http://www.google.com
// 冻结后，不能修改对象属性
Object.freeze(HOST);
HOST.url = 'http://www.taobao.com';
console.log(HOST.url); // http://www.google.com