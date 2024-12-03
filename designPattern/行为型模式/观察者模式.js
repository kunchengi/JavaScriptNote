class OfficialAccounts {
    constructor() {
        this.fansList = [];
    }
    add(fans) {
        this.fansList.push(fans);
    }
    delete(fans) {
        let index = this.fansList.findIndex(item => item === fans);
        if (index !== -1) {
            this.fansList.splice(index, 1);
        }
    }
    notify(message) {
        this.fansList.forEach(fan => {
            fan.updateMessage(message);
        });
    }
}
class Fans {
    constructor(name) {
        this.name = '';
        this.name = name;
    }
    updateMessage(message) {
        console.log(this.name + message);
    }
}
// 测试代码
const officialAccounts = new OfficialAccounts();
const fans1 = new Fans("张三");
const fans2 = new Fans("李四");
officialAccounts.add(fans1);
officialAccounts.add(fans2);
officialAccounts.notify("更新了");
/**
 * 输出：
 * 张三更新了
 * 李四更新了
 */
/**
 * 发布订阅模式
 *  - 比观察者模式多了事件总线
 */
// 事件总线
class EventBus {
    constructor() {
        /**
        * @description 事件表
        * @defaultValue null
        * @status public
        */
        this.eventMap = new Map();
    }
    /**
    * @description 订阅事件
    * @param {string} eventName 事件名称
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    on(eventName, callback) {
        var _a;
        if (!this.eventMap.has(eventName)) {
            this.eventMap.set(eventName, [callback]);
        }
        else {
            (_a = this.eventMap.get(eventName)) === null || _a === void 0 ? void 0 : _a.push(callback);
        }
    }
    /**
    * @description 发布事件
    * @param {string} eventName 事件名称
    * @param {any} args 参数
    * @return void
    * @status public
    */
    emit(eventName, ...args) {
        var _a;
        if (this.eventMap.has(eventName)) {
            (_a = this.eventMap.get(eventName)) === null || _a === void 0 ? void 0 : _a.forEach(callback => {
                callback(...args);
            });
        }
    }
    /**
    * @description 取消事件
    * @param {string} eventName 事件名称
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    off(eventName, callback) {
        var _a, _b;
        if (this.eventMap.has(eventName)) {
            if (callback) {
                let index = (_a = this.eventMap.get(eventName)) === null || _a === void 0 ? void 0 : _a.findIndex(item => item === callback);
                if (index !== -1) {
                    (_b = this.eventMap.get(eventName)) === null || _b === void 0 ? void 0 : _b.splice(index, 1);
                }
            }
            else {
                this.eventMap.delete(eventName);
            }
        }
    }
    /**
    * @description 注册一次性订阅事件,触发一次后自动取消订阅
    * @param {string} eventName 事件名称
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    once(eventName, callback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
    }
}
// 全局事件总线
const gobalEventBus = new EventBus();
// 发布者
class Publisher {
    constructor() {
    }
    sendMessage(message) {
        gobalEventBus.emit("message", message);
    }
}
// 订阅者1
class Subscriber1 {
    constructor() {
        this.name = "订阅者1";
        /**
        * @description this 指向订阅者1的onMessage
        * @defaultValue null
        * @status public
        */
        this.thisOnMessage = null;
        this.thisOnMessage = this.onMessage.bind(this);
        gobalEventBus.on("message", this.thisOnMessage);
    }
    onMessage(message) {
        console.log(this.name + "收到消息：" + message);
    }
    /**
    * @description 取消订阅
    * @param
    * @return void
    * @status public
    */
    cancel() {
        if (this.thisOnMessage) {
            gobalEventBus.off("message", this.thisOnMessage);
        }
    }
}
// 订阅者2
class Subscriber2 {
    constructor() {
        this.name = "订阅者2";
        /**
        * @description this 指向订阅者1的onMessage
        * @defaultValue null
        * @status public
        */
        this.thisOnMessage = null;
        this.thisOnMessage = this.onMessage.bind(this);
        gobalEventBus.on("message", this.thisOnMessage);
    }
    /**
    * @description 消息监听
    * @param
    * @return void
    * @status public
    */
    onMessage(message) {
        console.log(this.name + "收到消息：" + message);
    }
    /**
    * @description 取消订阅
    * @param
    * @return void
    * @status public
    */
    cancel() {
        if (this.thisOnMessage) {
            gobalEventBus.off("message", this.thisOnMessage);
        }
    }
}
// 测试代码
// 创建发布者
const publisher = new Publisher();
// 创建订阅者
const subscriber1 = new Subscriber1();
const subscriber2 = new Subscriber2();
// 发布消息
publisher.sendMessage("欢迎关注我们的公众号！");
/**
 * 输出：
 * 订阅者1收到消息：欢迎关注我们的公众号！
 * 订阅者2收到消息：欢迎关注我们的公众号！
 */
// 取消订阅
subscriber1.cancel();
// 再次发布消息
publisher.sendMessage("最新活动已上线，快来参与吧！");
/**
 * 输出：
 * 订阅者2收到消息：最新活动已上线，快来参与吧！
 */
// 注册一次性订阅事件
gobalEventBus.once("onceMessage", (message) => {
    console.log("一次性订阅事件：" + message);
});
gobalEventBus.emit("onceMessage", "一次性订阅事件触发了！");
gobalEventBus.emit("onceMessage", "一次性订阅事件触发了！");
/**
 * 输出：
 * 一次性订阅事件：一次性订阅事件触发了！
 */ 
