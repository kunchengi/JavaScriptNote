/**
 * 思路：
 * 1. 构造函数传入执行器回调函数，传入解决函数和拒绝函数并执行
 * 2. 实现解决函数和拒绝函数，能够修改状态，并设置原因
 * 3. 状态的修改不可逆
 * 4. 实现then方法，传入成功回调和失败回调，如果状态为成功则执行成功回调，状态为失败则执行失败的回调
 * 5. 实现then方法没传参的情况
 *      - 当then方法的第一个回调不是函数，则设置默认值为()=>this.value
 *      - 当then方法第二个回调不是函数，则设置默认值为()=> {throw this.value}
 * 6. 实现执行器里面异步执行解决/拒绝函数和多次调用then方法的情况
 *      - 当状态为进行中，则将解决/拒绝函数添加到数组中
 *      - 解决函数和拒绝函数遍历数组并执行
 * 7. 
 *      
 */

class Promise1{
    /**
    * @description 进行中状态
    * @defaultValue null
    * @status public
    */
    static PENDING = 'pending';

    /**
    * @description 解决状态
    * @defaultValue null
    * @status public
    */
    static FULFILLED = 'fulfilled';

    /**
    * @description 拒绝状态
    * @defaultValue null
    * @status public
    */
    static REJECTED = 'rejected';

    /**
    * @description 状态
    * @defaultValue pending
    * @status public
    */
    PromiseState = Promise1.PENDING;

    /**
    * @description 原因
    * @defaultValue undefined
    * @status public
    */
    PromiseResult = undefined;

    /**
    * @description then回调函数数组，私有属性，[{onFulfilled, onRejected}]
    * @defaultValue [];
    * @status public
    */
    #callbacks = [];

    /**
    * @description 构造函数
    * @param {Function} executor 执行者回调函数
    * @return void
    * @status public
    */
    constructor(executor){
        try{
            // 执行回调函数，修改this指向当前实例
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch(e){
            // 如果执行回调函数出错，则拒绝promise
            this.reject(e);
        }
    }

    /**
    * @description 解决promise
    * @param {any} value 解决值
    * @return void
    * @status public
    */
    resolve(value){
        // 状态改变后不可再次改变
        // 如果状态为进行中，则修改状态为解决状态
        if(this.PromiseState === Promise1.PENDING){
            this.PromiseState = Promise1.FULFILLED;
            this.PromiseResult = value;
            // 使用setTimeout将回调函数放入下一个宏任务中执行
            // 避免阻塞then后面的同步代码的执行，实现异步效果
            setTimeout(() => {
                // 遍历回调函数数组，执行所有解决回调
                this.#callbacks.forEach((callback) => {
                    callback.onFulfilled(value);
                });
            });
        }
    }

    /**
    * @description 拒绝promise
    * @param {any} reason 拒绝原因
    * @return void
    * @status public
    */
    reject(reason){
        // 如果状态为进行中，则修改状态为拒绝状态
        if(this.PromiseState === Promise1.PENDING){
            this.PromiseState = Promise1.REJECTED;
            if(reason instanceof Error)
            {
                reason = reason.message;
            }
            this.PromiseResult = reason;
        }
        // 使用setTimeout将回调函数放入下一个宏任务中执行
        // 避免阻塞同步代码的执行，实现异步效果
        setTimeout(() => {
            // 遍历回调函数数组，执行所有拒绝回调
            this.#callbacks.forEach((callback) => {
                callback.onRejected(reason);
            }); 
        });

    }

    /**
    * @description then方法
    * @param {Function} onFulfilled 解决回调
    * @param {Function} onRejected 拒绝回调
    * @return void
    * @status public
    */
    then(onFulfilled, onRejected){
        // 如果回调不是函数，则赋值一个函数，避免报错
        if (!(onFulfilled instanceof Function)) {
            // 回调函数返回值为当前值，实现值穿透
            onFulfilled = () => this.PromiseResult;
        }
        if (!(onRejected instanceof Function)) {
            onRejected = () => this.PromiseResult;
        }
        // 返回一个新的promise,实现链式调用
        // 新promise的状态除了执行异常，其它情况都是解决状态
        let promise =  new Promise1((resolve, reject) => {
            // 解决执行then方法时状态还未改变的问题
            if(this.PromiseState === Promise1.PENDING){
                // 如果状态为进行中，则将回调函数保存到数组中
                this.#callbacks.push({
                    onFulfilled: value => {
                        try{
                            this.parse(promise, onFulfilled(value), resolve, reject);
                        }
                        catch(e){
                            reject(e);
                        }
                    },
                    onRejected: reason => {
                        try{
                            this.parse(promise, onRejected(reason), resolve, reject);
                        }
                        catch(e){
                            reject(e);
                        }
                    }
                });
            }
            // 如果状态为解决状态，则执行解决回调
            if(this.PromiseState === Promise1.FULFILLED){
                // 使用setTimeout将回调函数放入下一个宏任务中执行
                // 避免阻塞同步代码的执行，实现异步效果
                setTimeout(() => {
                    try{
                        this.parse(promise, onFulfilled(this.PromiseResult), resolve, reject);
                    }
                    catch(e){
                        reject(e);
                    }
                });
            }
            // 如果状态为拒绝状态，则执行拒绝回调
            if(this.PromiseState === Promise1.REJECTED){
                setTimeout(() => {
                    try{
                        this.parse(promise, onRejected(this.PromiseResult), resolve, reject);
                    }
                    catch(e){
                        reject(e);
                    }
                });
            }
        });
        return promise;
    }

    /**
    * @description 解析返回值
    * @param {Promise1} promise 新promise
    * @param {any} result 返回值
    * @param {Function} resolve 新promise解决回调
    * @param {Function} reject 新promise拒绝回调
    * @return void
    * @status public
    */
    parse(promise, result, resolve, reject){
        // 不允许返回当前promise
        // 如果promise和返回值相等，则抛出错误
        if(promise == result)
        {
            throw new TypeError("Chaining cycle detected for promise");
        }
        if(result instanceof Promise1){
            // 如果返回值是promise，则执行then方法
            result.then(resolve, reject);
        }
        else{
            // 如果返回值不是promise，则执行新promise的解决回调
            resolve(result);
        }
    }

    /**
    * @description 静态方法resolve
    * @param {any} value 解决值
    * @return void
    * @status public
    */
    static resolve(value){
        if(value instanceof Promise1){
            return value;
        }
        else{
            return new Promise1((resolve, reject) => {
                resolve(value);
            });
        }
    }

    /**
    * @description 静态方法reject
    * @param {any} reason 拒绝原因
    * @return void
    * @status public
    */
    static reject(reason){
        return new Promise1((resolve, reject) => {
            reject(reason);
        });
    }

    /**
    * @description 静态方法allSettled
    * @param {Array} promises promise数组
    * @return void
    * @status public
    */
    static allSettled(promises){
        // 返回一个新的promise
        // 当所有promise都解决时，新promise才解决
        // 无论是否拒绝，都返回一个对象
        return new Promise1((resolve, reject) => {
            let results = [];
            const compoletFunc = (value) => {
                results.push(value);
                if(results.length === promises.length){
                    resolve(results);
                }
            };
            promises.forEach((promise) => {
                promise.then(compoletFunc,compoletFunc);
            })
        })
    }

    /**
    * @description 静态方法all
    * @param {Array} promises promise数组
    * @return void
    * @status public
    */
    static all(promises){
        // 返回一个新的promise
        // 当所有promise都解决时，新promise才解决
        // 只要有一个promise拒绝，则新promise就拒绝
        return new Promise1((resolve, reject) => {
            let results = [];
            promises.forEach((promise) => {
                promise.then((value) => {
                    results.push(value);
                    if(results.length === promises.length){
                        resolve(results);
                    }
                }, (reason) => {
                    reject(reason);
                });
            });
        });
    }

    /**
    * @description 静态方法race
    * @param {Array} promises promise数组
    * @return void
    * @status public
    */
    static race(promises) {
        // 返回一个新的promise，实现竞速效果
        // 遍历所有promise，只要有一个promise解决或拒绝，新promise就解决或拒绝
        return new Promise1((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then(resolve, reject);
            });
        });
    }

    /**
    * @description 静态方法catch
    * @param {Function} onRejected 拒绝回调
    * @return void
    * @status public
    */
    static catch(onRejected){
        return this.then(null, onRejected);
    }
}

// 测试代码
// let promise = new Promise((resolve, reject) => {
//     resolve("成功");
// });
// console.log(promise);

// let promise1 = new Promise1((resolve, reject) => {
//     resolve("成功");
// });
// console.log(promise1);
// promise1.then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });

Promise1.reject(new Promise1((resolve, reject) => {
    resolve("成功1");
    // reject("失败1");
})).then((value) => {
    console.log("1");
    console.log(value);
}, (reason) => {
    console.log("2");
    console.log(reason);
});

// Promise1.reject(new Promise1((resolve, reject) => {
//     resolve("成功");
// })).then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });

function promiseFunc(res)
{
    return new Promise1((resolve, reject) => {
        if(res.includes("失败"))
        {
            reject(res);
        }
        resolve(res);
    });
}
let promiseArr = [promiseFunc("成功1"), promiseFunc("成功2"), promiseFunc("失败"), promiseFunc("成功3")];
// Promise.allSettled方法
// 返回所有promise的结果，不管成功还是失败
Promise1.allSettled(promiseArr).then((res) => {
    console.log(res);
});