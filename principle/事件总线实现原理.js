/**
 * eventBus: 包含所有功能的事件总线对象
 * eventBus.on(eventName, callback) 注册/绑定事件
 * eventBus.emit(eventName, params) 触发事件
 * eventBus.off(eventName) 解绑事件,如果不传则解绑所有
 */

class EventBus {

    /**
     * @description 事件总线实例
     * @defaultValue 
     * @status public
     */
    static _instance = null;

    /**
     * @description 事件对象
     * @defaultValue 
     * @status public
     */
    _events = {};

    constructor() {

    }

    // 获取实例
    static get instance() {
        if (!EventBus._instance) {
            EventBus._instance = new EventBus();
        }
        return EventBus._instance;
    }

    /**
     * @description 注册/绑定事件
     * @param {String} eventName 事件名称
     * @param {Function} callback 回调函数
     * @return void
     * @status public
     */
    on(eventName, callback) {
        // 未注册过该事件，初始化一个空数组
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        // 将回调函数添加到数组中
        this._events[eventName].push(callback);
    }

    /**
     * @description 触发事件
     * @param {String} eventName 事件名称
     * @param {Object} params 传入的参数
     * @return void
     * @status public
     */
    emit(eventName, params) {
        // 未注册过该事件，直接返回
        if (!this._events[eventName]) {
            return;
        }
        this._events[eventName].forEach(callback => callback(params));
    }

    /**
     * @description 解绑事件
     * @param {String} eventName 事件名称
     * @return void
     * @status public
     */
    off(eventName) {
        // 未传事件名，解绑所有
        if (!eventName) {
            this._events = {};
        } else {
            // 删除对应事件
            delete this._events[eventName];
        }
    }
}

console.log(EventBus.instance);
// 绑定多个事件
EventBus.instance.on('login', (params) => {
    console.log(params);
    console.log("登录成功");
});
EventBus.instance.on('login', (params) => {
    console.log(params);
    console.log("登录数据已经写入");
});

// 触发事件
EventBus.instance.emit('login', {username: 'admin', password: '123456'});

// 解绑事件
EventBus.instance.off('login');
