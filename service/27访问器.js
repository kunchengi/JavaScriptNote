// 使用访问器设置getter和setter方法
const obj8 = {
    _name: "a",
    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    }
};
console.log(obj8.name); // a
obj8.name = "b";
console.log(obj8.name); // b
// 使用访问器伪造属性
const line = {
    _start: { x: 0, y: 0 },
    _end: { x: 1, y: 1 },
    get length() {
        let dx = this._end.x - this._start.x;
        let dy = this._end.y - this._start.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
};
console.log(line.length); // 1.4142135623730951
// 使用访问器批量设置属性
const web = {
    _name: "百度",
    _url: "http://www.baidu.com",
    set site(value) {
        [this._name,this._url] = value.split(",");
    }
};
web.site = "谷歌,http://www.google.com";
console.log(web); // { _name: '谷歌', _url: 'http://www.google.com', site: [Setter] }
// token读写处理
let Request = {
    get token() {
        let token = localStorage.getItem("token");
        if (!token) {
            throw new Error("token不存在");
        }
        return token;
    },
    set token(value) {
        localStorage.setItem("token", value);
    }
};
Request.token = "123456";
console.log(Request.token); // 123456
// 当访问器属性名和数据属性名相同时，访问器属性优先
const obj9 = {
    name: "a",
    get name() {
        return "b";
    }
};
console.log(obj9.name); // b
// 定义属性的描述设置访问器属性
function User(name, age) {
    let data = { name, age };
    Object.defineProperties(this, {
        name: {
            get() {
                return data.name;
            },
            set(value) {
                data.name = value;
            }
        },
        age: {
            get() {
                return data.age;
            },
            set(value) {
                data.age = value;
            }
        }
    });
}
let user = new User("a", 18);
console.log(user.name); // a
user.name = "b";
console.log(user.name); // b