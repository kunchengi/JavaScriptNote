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
 * 7. 编写runAsyncTask函数
 *      - 使用queueMicrotask、MutationObserver、setTimeout实现异步
 * 8. 执行解决、拒绝回调时使用runAsyncTask函数实现异步执行
 * 9. 实现then方法链式调用
 *      - 返回一个新的promise，实现链式调用
 *      - 如果回调函数抛出异常，则执行新promise的reject方法
 *      - 如果返回值为promise，则执行该promise的then方法，否则执行新promise的resolve方法
 *      - 处理重复引用：如果返回值和当前promise是同一个对象，则抛出异常
 * 10. 实现catch方法
 *      - catch方法实际上是then方法的语法糖
 *      - catch方法等价于then(null, onRejected)
 * 11. 实现finally方法
 *      - finally方法无论promise是成功还是失败，都会执行回调函数
 *      - finally方法等价于then(onFinally,onFinally)
 * 12. 实现静态方法resolve
 *      - 如果是promise则直接返回，否则创建成功的promise并返回
 * 13. 实现静态方法reject
 *      - 创建失败的promise并返回
 * 14. 实现静态方法race
 *      - 遍历所有promise，只要有一个promise解决或拒绝，新promise就解决或拒绝
 * 15. 实现静态方法all
 *      - 返回promise实例
 *      - 判断是否为数组，不是数组返回拒绝的promise，错误信息：Arguments must be iterable
 *      - 空数组直接返回成功的promise
 *      - 处理全部解决
 *          - 记录结果：通过索引设置到新数组中，保证结果的顺序和promise数组的顺序一致
 *          - 判断全部解决：记录解决的次数，如果次数和promise数组长度一致，则返回成功的promise
 *      - 处理第一个拒绝
 * 16. 实现静态方法allSettled
 *      - 返回promise实例
 *      - 判断是否为数组，不是数组返回拒绝的promise，错误信息：Arguments must be iterable
 *      - 空数组直接返回成功的promise
 *      - 等待所有结果
 *          - 记录结果：通过索引设置到新数组中，保证结果的顺序和promise数组的顺序一致
 *          - 处理成功{status:'fulfilled',value:x}
 *          - 处理失败{status:'rejected',reason:x}
 *          - 判断结束：记录成功+失败的次数，如果次数和promise数组长度一致，则返回成功的promise
 * 17. 实现静态方法any
 *      - 返回promise实例
 *      - 判断是否为数组，不是数组返回拒绝的promise，错误信息：Arguments must be iterable
 *      - 传入空数组，拒绝，AggregateError: All promises were rejected--[]
 *      - 如果有成功，获取最快成功的值
 *      - 如果都失败，拒绝，AggregateError: All promises were rejected--[失败原因1，失败原因2...]
 *      - 不传入参数，拒绝，TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
 * 18. 测试自己写的promise是否符合规范
 *      - 暴露deferred方法，返回对象{promise,resolve,reject}
 *      - 初始化项目，npm init -y
 *      - 下载测试包：cnpm i promises-aplus-tests -D
 *      - 配置：package.json代码文件的scripts
 *          - "testPromise": "promises-aplus-tests principle/promise实现原理.js"
 *      - 执行：npm run testPromise
 *      - 错误文档：https://promisesaplus.com/
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
            // 使用runAsyncTaskt将回调函数放入任务列表中执行
            // 避免阻塞then后面的同步代码的执行，实现异步效果
            this.runAsyncTask(() => {
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
        // 使用runAsyncTaskt将回调函数放入任务列表中执行
        // 避免阻塞同步代码的执行，实现异步效果
        this.runAsyncTask(() => {
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
            onFulfilled = (res) => res;
        }
        if (!(onRejected instanceof Function)) {
            onRejected = (err) => {throw err};
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
                // 使用runAsyncTaskt将回调函数放入任务列表中执行
                // 避免阻塞同步代码的执行，实现异步效果
                this.runAsyncTask(() => {
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
                // 使用runAsyncTaskt将回调函数放入任务列表中执行
                // 避免阻塞同步代码的执行，实现异步效果
                this.runAsyncTask(() => {
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
        if(promise === result)
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
            // 如果不是数组，则返回一个拒绝的promise
            if(!Array.isArray(promises))
            {
                reject(new TypeError("Argument is not iterable"));
            }
            // 如果数组长度为0，则返回一个解决的promise
            if(promises.length === 0)
            {
                resolve(promises);
            }
            let results = [];
            let count = 0;
            const compoletFunc = (index,isSuccess,value) => {
                let result = isSuccess ? {status: Promise1.FULFILLED, value} : {status: Promise1.REJECTED, reason: value};
                results[index] = result;
                if(++count === promises.length)
                {
                    resolve(results);
                }
            };
            promises.forEach((promise,index) => {
                // resolve会把非promise转成promise，promise直接用
                let realPromise = Promise1.resolve(promise);
                realPromise.then(compoletFunc.bind(this,index,true),compoletFunc.bind(this,index,false));
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
            // 如果不是数组，则返回一个拒绝的promise
            if(!Array.isArray(promises))
            {
                reject(new TypeError("Argument is not iterable"));
            }
            // 如果数组长度为0，则返回一个解决的promise
            if(promises.length === 0)
            {
                resolve(promises);
            }
            let results = [];
            let count = 0;
            promises.forEach((promise,index) => {
                // resolve会把非promise转成promise，promise直接用
                let realPromise = Promise1.resolve(promise);
                realPromise.then((value) => {
                    // 不能用push，不然返回的结果和传入的顺序不一致
                    // results.push(value);
                    // if(results.length === promises.length){
                    //     resolve(results);
                    // }
                    results[index] = value;
                    // 当解决的次数和数组的长度一致时，就返回结果
                    if (++count === promises.length) {
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
            // 如果不是数组，直接拒绝
            if(!Array.isArray(promises))
            {
                reject(new TypeError("Argument is not iterable"));
            }
            promises.forEach((promise) => {
                // resolve会把非promise转成promise，promise直接用
                let realPromise = Promise1.resolve(promise);
                realPromise.then(resolve, reject);
            });
        });
    }

    /**
    * @description 静态方法any
    * @param promises  promise数组
    * @return void
    * @status public
    */
    static any(promises){
        return new Promise((resolve, reject) => {
            if(!Array.isArray(promises))
            {
                reject(new TypeError("Argument is not iterable"));
            }
            if(promises.length === 0)
            {
                reject(new AggregateError(promises,"All promises were rejected"));
            }
            promises.forEach((promise,index) => {
                // resolve会把非promise转成promise，promise直接用
                let realPromise = Promise1.resolve(promise);
                const errors = [];
                let count = 0;
                realPromise.then(resolve, err=>{
                    errors[index] = err;
                    if(++count === promises.length)
                    {
                        reject(new AggregateError(errors,"All promises were rejected"));
                    }
                });
            });
        })
    }

    /**
    * @description 静态方法catch
    * @param {Function} onRejected 拒绝回调
    * @return void
    * @status public
    */
    catch(onRejected){
        return this.then(null, onRejected);
    }

    /**
    * @description 
    * @param 
    * @return void
    * @status public
    */
    finally(onFinally){
        return this.then(onFinally,onFinally);
    }
    

    /**
    * @description 异步执行函数
    * @param {Function} callback 回调函数
    * @return void
    * @status public
    */
    runAsyncTask(callback){
        // 浏览器支持queueMicrotask方法，则使用它
        if(typeof queueMicrotask === "function")
        {
            queueMicrotask(callback);
        }
        else if(typeof MutationObserver === "function")
        {
            // 浏览器支持MutationObserver，使用它
            const observer = new MutationObserver(callback);
            const divNode = document.createElement("div");
            observer.observe(divNode, {
                childList: true
            });
            divNode.innerText = "1";
        }
        else
        {
            // 浏览器不支持，使用setTimeout方法
            setTimeout(callback, 0);
        }
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
/**
 * 输出：
 * Promise1
 * 成功
 */

// 测试异步执行
// setTimeout(() => {
//     console.log("宏任务");
// }, 0);
// let promise1 = new Promise1((resolve, reject) => {
//     console.log("promise1");
//     resolve("微任务");
// });
// promise1.then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });
// console.log("同步执行");
/**
 * 输出：
 * promise1
 * 同步执行
 * 微任务
 * 宏任务
 */
// setTimeout(() => {
//     console.log("宏任务");
// }, 0);
// let promise1 = new Promise1((resolve, reject) => {
//     console.log("promise1");
//     setTimeout(() => {
//         console.log("宏任务1");
//         resolve("微任务");
//     }, 0);

// });
// promise1.then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });
// console.log("同步执行");
/**
 * 输出：
 * promise1
 * 同步执行
 * 宏任务
 * 宏任务1
 * 微任务
 */

// 执行reject会返回一个失败的Promise对象，原因为传入的参数
// Promise1.reject(new Promise1((resolve, reject) => {
//     resolve("成功1");
// })).then((value) => {
//     console.log("1");
//     console.log(value);
// }, (reason) => {
//     console.log("2");
//     console.log(reason);
// });
/**
 * 输出：
 * 2
 * Promise1
 */

// // 测试重复引用
// let promise1 = new Promise1((resolve, reject) => {
//     resolve("成功");
// });
// let promise2 = promise1.then((value) => {
//     return promise2;
// });
// promise2.then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });
// /**
//  * 输出：
//  * Chaining cycle detected for promise
//  */

// // 测试catch方法和finally方法
// let promise1 = new Promise1((resolve, reject) => {
//     throw "抛出异常"
// });
// promise1.catch(err=>{
//     console.log(err);
// }).finally(()=>{
//     console.log("finally");
// })
/**
 * 输出：
 * 抛出异常
 * finally
 */

// 测试静态方法resolve
// Promise1.resolve(2).then((res)=>{
//     console.log(res);
// })
// /**
//  * 输出：
//  * 2
//  */

// 测试静态方法reject
// let promise1 = Promise1.reject(new Promise1((resolve,reject)=>{
//     resolve(1)
// }))
// promise1.then((res)=>{
//     console.log("成功");
// },(err)=>{
//     console.log("失败");
//     console.log(err);
// })
// /**
//  * 输出：
//  * 失败
//  * Promise1 {PromiseState: 'fulfilled', PromiseResult: 1, #callbacks: Array(0)}
//  */

// 测试allSettled
let promise1 = new Promise1((resolve, reject) => {
    resolve("成功1")
})
let promise2 = new Promise1((resolve, reject) => {
    reject("失败3")
})
Promise1.allSettled(1).then(res => {
    console.log(res);
},(err)=>{
    console.log(err);
})

// Promise1.reject(new Promise1((resolve, reject) => {
//     resolve("成功");
// })).then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// });

// function promiseFunc(res)
// {
//     return new Promise1((resolve, reject) => {
//         if(res.includes("失败"))
//         {
//             reject(res);
//         }
//         resolve(res);
//     });
// }
// let promiseArr = [promiseFunc("成功1"), promiseFunc("成功2"), promiseFunc("失败"), promiseFunc("成功3")];
// // Promise.allSettled方法
// // 返回所有promise的结果，不管成功还是失败
// Promise1.allSettled(promiseArr).then((res) => {
//     console.log(res);
// });

module.exports = {
    deferred() {
        let res = {};
        res.promise = new Promise1((resolve, reject) => {
            res.resolve = resolve;
            res.reject = reject;
        });
        return res;
    }
}