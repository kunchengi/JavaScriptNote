/**
 * PubSub: 包含所有功能的订阅/发布消息的管理者
 * PubSub.subscribe(msgName, callback): 订阅消息: msgName: 消息名称，callback: 回调函数
 * PubSub.publish(msgName, data): 异步发布消息: msgName: 消息名称，data: 消息数据
 * PubSub.publishSync(msgName, data): 同步发布消息: msgName: 消息名称，data: 消息数据
 * PubSub.unsubscribe(flag): 取消订阅: flag: 订阅消息的返回值，或是msgName
 * 与 EventEmitter 的区别：
 * 可以单独取消某条订阅
 */

class PubSub
{
    /**
     * @description 订阅消息的ID
     * @defaultValue 
     * @status public
     */
    _id = 1;

    /**
     * @description 订阅消息的集合，格式：{msgName: {token1: callback, token2: callback}}
     * @defaultValue 
     * @status public
     */
    _subscribers = {};

    /**
     * @description 单例
     * @defaultValue 
     * @status public
     */
    static _instance = null;
    constructor()
    {

    }
    
    /**
     * @description 获取单例
     * @param 
     * @return void
     * @status public
     */
    static get instance()
    {
        if(!PubSub._instance)
        {
            PubSub._instance = new PubSub();
        }
        return PubSub._instance;
    }

    /**
     * @description 订阅消息
     * @param msgName 消息名称
     * @param callback 回调函数
     * @return void
     * @status public
     */
    subscribe(msgName, callback)
    {
        let token = "token_" + this._id++;
        // 未订阅过该消息，初始化一个空对象
        if(!this._subscribers[msgName])
        {
            this._subscribers[msgName] = {};
        }
        // 将回调函数添加到对象中
        this._subscribers[msgName][token] = callback;
        // 返回当前订阅消息的token
        return token;
    }

    /**
     * @description 发布消息
     * @param msgName 消息名称
     * @param data 消息数据
     * @return void
     * @status public
     */
    publish(msgName, data)
    {
        let subscribers = this._subscribers[msgName];
        // 未订阅过该消息, 不做处理
        if(!subscribers)
        {
            return;
        }
        // 获取所有订阅者的回调
        const values = Object.values(subscribers);
        // 遍历执行所有订阅者的回调
        values.forEach(callback => {
            callback(data);
        });
    }

    /**
     * @description 取消订阅
     * @param flag 订阅消息的返回值，或是msgName
     * flag 为空，取消所有订阅
     * flag 为msgName，取消该msgName订阅的所有回调
     * flag 为token，取消该token的订阅
     * @return void
     * @status public
     */
    unsubscribe(flag)
    {
        if(!flag)
        {
            this._subscribers = {};
        }
        // 获取flag对应的订阅列表
        const subscriberObj = this._subscribers[flag];
        // 如果存在该订阅，说明传入的是msgName，则删除
        if(subscriberObj)
        {
            delete this._subscribers[flag];
        }else// 传入的是token
        {
            // 遍历所有订阅列表
            const subscriberObjs = Object.values(this._subscribers);
            // 遍历所有订阅列表，找到flag对应的订阅
            const subscriber = subscriberObjs.find(subscriberObj => subscriberObj.hasOwnProperty(flag));
            if(subscriber)
            {
                // 删除该订阅
                delete subscriber[flag];
            }
        }
    }
}

console.log("测试订阅消息");
// 商家订阅下单消息
let storePay =  PubSub.instance.subscribe("pay", function(data)
{
    console.log("pay", data);
    console.log("商家接到订单，准备制作");
})

// 骑手订阅下单消息
let riderPay = PubSub.instance.subscribe("pay", function(data)
{
    console.log("pay", data);
    console.log("骑手接到订单，准备取餐");
})

// 商家订阅退单消息
PubSub.instance.subscribe("cancel", function(data)
{
    console.log("cancel", data);
    console.log("客户取消订单，停止制作");
})

// 骑手订阅退单消息
PubSub.instance.subscribe("cancel", function(data)
{
    console.log("cancel", data);
    console.log("客户取消订单，停止配送");
})

console.log("测试发布消息");
// 客户发布订单消息
PubSub.instance.publish("pay", {
    title: "鱼香肉丝",
    price: 20,
    address: "上海市"
});

// 客户发布退单消息
PubSub.instance.publish("cancel", {
    title: "cancel",
    price: 20,
    address: "cancel"
});

console.log("测试取消订阅");

// 商家取消下单订阅
PubSub.instance.unsubscribe(storePay);

// 取消所有退单订阅
PubSub.instance.unsubscribe("cancel");

PubSub.instance.publish("pay", {
    title: "宫保鸡丁",
    price: 20,
    address: "广州"
});

PubSub.instance.publish("cancel", {
    title: "宫保鸡丁",
    price: 20,
    address: "广州"
});

console.log("测试取消全部订阅");
PubSub.instance.unsubscribe();
PubSub.instance.publish("pay", {
    title: "宫保鸡丁",
    price: 20,
    address: "广州"
});