/**
 * 观察者模式(发布-订阅（Publish/Subscribe）模式)
 *  - 被观察者存放所有观察者，当被观察者变化时通知观察者
 *  - 定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。
 *  - 这个主题对象在状态变化时，会通知所有的观察者对象，使他们能够自动更新自己
 *  - 四个角色
 *      - Subject：抽象主题（抽象被观察者）
 *          - 抽象主题角色把所有观察者对象保存在一个集合里，每个主题都可以有任意数量的观察者
 *          - 抽象主题提供一个接口，可以增加和删除观察者对象。
 *      - ConcreteSubject：具体主题（具体被观察者）
 *          - 该角色将有关状态存入具体观察者对象
 *          - 在具体主题的内部状态发生改变时，给所有注册过的观察者发送通知。
 *      - Observer：抽象观察者
 *          - 是观察者者的抽象类，它定义了一个更新接口，使得在得到主题更改通知时更新自己
 *      - ConcreteObserver：具体观察者
 *          - 实现抽象观察者定义的更新接口，以便在得到主题更改通知时更新自身的状态
 *  - 案例
 *      - 事件监听
 *      - 微信用户就是观察者，微信公众号是被观察者，有多个的微信用户关注了公众号，当公众号更新时就会通知这些订阅的微信用户
 *  - 例子
 *      - Subject（抽象被观察者接口）
 *          - 有add、delete、notify方法
 *      - OfficialAccounts（具体被观察者类）
 *          - 有fansList粉丝列表属性
 *          - 实现了Subject的add、delete、notify方法
 *          - 其中add、delete可以增删fansList，notify遍历fansList执行updateMessage方法
 *      - Observer（抽象观察者接口）
 *          - 有updateMessage()方法，用于监听通知
 *      - Fans（具体观察者类）
 *          - 实现了Observer的updateMessage()方法
 */
interface Subject {
    add(fans:Observer):void;
    delete(fans:Observer):void;
    notify(message:string):void;
}

class OfficialAccounts implements Subject {
    private fansList:Observer[] = []
    constructor() {
        
    }
    public add(fans:Observer):void
    {
        this.fansList.push(fans)
    }
    public delete(fans:Observer):void
    {
        let index:number = this.fansList.findIndex(item => item === fans);
        if(index !== -1)
        {
            this.fansList.splice(index,1)
        }
    }
    public notify(message:string):void
    {
        this.fansList.forEach(fan => {
            fan.updateMessage(message)
        })
    }
}

interface Observer{
    updateMessage(message:string):void;
}

class Fans implements Observer{
    private name:string = '';
    constructor(name:string) {
        this.name = name;
    }
    public updateMessage(message:string):void
    {
        console.log(this.name+message);
    }
}

// 测试代码
const officialAccounts = new OfficialAccounts()
const fans1 = new Fans("张三")
const fans2 = new Fans("李四")
officialAccounts.add(fans1)
officialAccounts.add(fans2)
officialAccounts.notify("更新了")
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
    /**
    * @description 事件表
    * @defaultValue null
    * @status public
    */
    private eventMap:Map<string,Function[]> = new Map();
    constructor() {
        
    }

    /**
    * @description 订阅事件
    * @param {string} eventName 事件名称
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    public on(eventName:string,callback:Function):void
    {
        if(!this.eventMap.has(eventName))
        {
            this.eventMap.set(eventName,[callback])
        }else{
            this.eventMap.get(eventName)?.push(callback)
        }
    }

    /**
    * @description 发布事件
    * @param {string} eventName 事件名称
    * @param {any} args 参数
    * @return void
    * @status public
    */
    public emit(eventName:string,...args:any[]):void
    {
        if(this.eventMap.has(eventName))
        {
            this.eventMap.get(eventName)?.forEach(callback => {
                callback(...args)
            })
        }
    }

    /**
    * @description 取消事件
    * @param {string} eventName 事件名称
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    public off(eventName:string,callback:Function):void
    {
        if(this.eventMap.has(eventName))
        {
            if(callback)
            {
                let index:number = this.eventMap.get(eventName)?.findIndex(item => item === callback) as number;
                if(index !== -1)
                {
                    this.eventMap.get(eventName)?.splice(index,1)
                }
            }
            else
            {
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
    public once(eventName:string,callback:Function):void
    {
        const onceCallback = (...args:any[]) => {
            callback(...args);
            this.off(eventName,onceCallback);
        }
        this.on(eventName,onceCallback);
    }
}

// 全局事件总线
const gobalEventBus = new EventBus();

// 发布者
class Publisher {

    constructor() {
        
    }
    public sendMessage(message:string):void
    {
        gobalEventBus.emit("message",message);
    }
}

// 订阅者1
class Subscriber1 {
    private name = "订阅者1";

    /**
    * @description this 指向订阅者1的onMessage
    * @defaultValue null
    * @status public
    */
    private thisOnMessage:Function|null = null;
    constructor() {
        this.thisOnMessage = this.onMessage.bind(this);
        gobalEventBus.on("message",this.thisOnMessage);
    }
    public onMessage(message:string):void
    {
        console.log(this.name + "收到消息："+message);
    }
    /**
    * @description 取消订阅
    * @param 
    * @return void
    * @status public
    */
    public cancel():void
    {
        if(this.thisOnMessage)
        {
            gobalEventBus.off("message",this.thisOnMessage);
        }
    }
}

// 订阅者2
class Subscriber2 {
    private name = "订阅者2";

    /**
    * @description this 指向订阅者1的onMessage
    * @defaultValue null
    * @status public
    */
    private thisOnMessage:Function|null = null;
    constructor() {
        this.thisOnMessage = this.onMessage.bind(this);
        gobalEventBus.on("message",this.thisOnMessage);
    }

    /**
    * @description 消息监听
    * @param 
    * @return void
    * @status public
    */
    public onMessage(message:string):void
    {
        console.log(this.name + "收到消息："+message);
    }

    /**
    * @description 取消订阅
    * @param 
    * @return void
    * @status public
    */
    public cancel():void
    {
        if(this.thisOnMessage)
        {
            gobalEventBus.off("message",this.thisOnMessage);
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
gobalEventBus.once("onceMessage",(message:string) => {
    console.log("一次性订阅事件："+message);
})

gobalEventBus.emit("onceMessage","一次性订阅事件触发了！")
gobalEventBus.emit("onceMessage","一次性订阅事件触发了！")
/**
 * 输出：
 * 一次性订阅事件：一次性订阅事件触发了！
 */