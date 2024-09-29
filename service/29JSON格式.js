// obj转JSON
let user = {
    name: "张三",
    age: 18,
    phones: ["小米14","iphone15"],
    homeInfo: {
        address: "广东省广州市"
    }
}
// 第一个参数是要转换的对象，第二个参数是要转换的参数，第三个参数是缩进的字节数
let userJSON = JSON.stringify(user, ["name","phones"],4);
console.log(userJSON);
/**
    {
        "name": "张三",
        "phones": [
            "小米14",
            "iphone15"
        ]
    }
 */
// 在对象中添加toJSON方法可以返回自定义数据
let user1 = {
    name: "张三",
    age: 18,
    phones: ["小米14","iphone15"],
    homeInfo: {
        address: "广东省广州市"
    },
    toJSON(){
        return {
            name: this.name,
            age: this.age + 2
        }
    }
}
let user1JSON = JSON.stringify(user1);
console.log(user1JSON);// {"name":"张三","age":20}

// JSON转obj，第一个参数是要转换的JSON，处理的回调函数
let obj = JSON.parse(userJSON, (key, value)=>{
    if(key == "name"){
        value = value + "一号";
    }
    return value;
})
console.log(obj);// {name: '张三一号', phones: Array(2)}
