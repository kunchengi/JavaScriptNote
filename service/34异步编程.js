/**
 * 事件循环机制（任务轮询）：
 * 核心概念：
 * 1. 调用栈（Call Stack）：同步任务
 *  - JavaScript 是单线程的，所有的同步代码都在调用栈中按顺序执行。
 *  - 当函数被调用时，它被放入调用栈中，执行完毕后弹出。
 * 2. 宏任务队列（Task Queue / Callback Queue）：异步任务
 *  - 异步任务（例如定时器、ajax、dom事件等）的回调函数在请求完成后会被放入宏任务队列中
 *  - 等待调用栈和微任务队列为空时被事件循环调度执行。（即等待同步任务执行完毕后，再执行异步任务）
 * 3. 微任务队列（Microtask Queue）:
 *  - 微任务通常比宏任务（即任务队列中的任务）优先级更高。
 *  - 常见的微任务包括 Promise 的回调、MutationObserver 的回调等。
 *  - Promise在执行回调（resolve、reject）时，才会产生微任务。
 * 事件循环的工作原理：
 * 1. 执行调用栈中的同步代码，直到栈为空。
 * 2. 检查微任务队列，执行所有微任务，直到微任务队列为空。
 * 3. 检查宏任务队列，执行所有宏任务，直到宏任务队列为空。
 * 4. 重复上述步骤，直到所有任务执行完毕。
 * 定时器：
 * 定时器模块管理着两种定时器：
 * setTimeout：在指定的时间后将回调函数放入任务队列中。
 * setInterval：每隔指定的时间将回调函数放入任务队列中。
 * 定时2秒，在设置定时器时就开始计时，计时完成后将回调函数放入任务队列中，等执行完同步任务后直接执行任务队列的回调函数。
 * 
 * proimse：
 * Promise是异步编程的一种解决方案，解决了回调地狱的问题。
 * Promise的状态：
 * 1. pending：初始状态，既不是成功，也不是失败状态。
 * 2. fulfilled：意味着操作成功完成。
 * 3. rejected：意味着操作失败。
 * Promise的特点：
 * 1. Promise的状态只能改变一次
 * 2. 异常穿透：Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止。
 * 3. 返回一个paending状态的Promise对象（return new Promise(()=>{})），可以终止Promise链。
 * Promise的方法：
 * 1. then：注册回调函数，当Promise的状态改变时调用。且返回一个新的Promise对象。
 *      - then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数。
 *      - then方法返回一个新的Promise对象，可以实现链式调用。
 *      - 当返回的对象有then方法时，会将返回的对象作为新的Promise对象。
 *      - 如果返回的对象是Promise对象，会根据返回的Promise对象的状态来决定新的Promise对象的状态。
 *      - 如果返回的对象是普通对象，会将返回的对象作为新的Promise对象的值，状态为resolved。
 *      - 如果抛出异常，新的Promise对象的状态为rejected。
 *      - 如果没有返回值，新的Promise对象的状态为resolved，值为undefined。
 * 2. catch：捕获错误，相当于then的第二个参数。
 * 3. finally：不管Promise的状态如何，都会执行finally方法。
 *      - finally方法的回调函数不接收任何参数。
 *      - 可以用来做一些清理工作。
 * 4. all：接收一个Promise对象数组，当所有Promise对象都成功时，返回所有Promise对象的结果。
 *      - 当有一个Promise对象失败时，返回失败的Promise对象的结果。
 * 5. allSettled：接收一个Promise对象数组，返回所有Promise对象的结果，不管成功还是失败。
 * 6. race：接收一个Promise对象数组，返回最先完成的Promise对象的结果。
 *      - 当最先完成的Promise对象失败时，返回失败的Promise对象的结果。
 *      - 当最先完成的Promise对象成功时，返回成功的Promise对象的结果。
 * 7. any：接收一个Promise对象数组，返回第一个成功的Promise对象的结果。
 *      - 当所有Promise对象都失败时，返回失败的Promise对象的结果。
 * 8. resolve：返回一个成功的Promise对象。
 *      - 如果传入的是Promise对象，直接返回。
 *      - 如果传入的不是Promise对象，返回一个新的Promise对象，状态为resolved，值为传入的值。
 * 9. reject：返回一个失败的Promise对象。
 * Promise的优缺点：
 * 优点：
 * 1. 可以将异步操作以同步操作的流程表达出来，避免了回调地狱。
 * 2. 可以在then方法中继续返回Promise对象，实现链式调用。
 * 缺点：
 * 1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
 * 2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
 * 3. 当处于pending状态时，无法得知目前进展到哪一个阶段。
 * 
 * async/await：
 * 1. async/await是Promise的语法糖，使得异步代码更加清晰易读。
 * 2. async函数返回一个Promise对象，类似then方法的返回值。
 * 3. await只能在async函数中使用
 * 4. await会同步当前函数的语法，对于外部函数来说，async函数还是异步执行的。
 * 5. 如果await后面是一个Promise对象，await会等待Promise对象的状态改变
 * 6. 如果await后面不是Promise对象，直接返回该值。
 * 7. 如果await后面的Promise对象是resolve状态，会返回Promise对象的值。
 * 8. 如果await后面的Promise对象是reject状态，会抛出异常，可以使用try...catch捕获。
 * 9. 在async函数中，await会等待Promise对象的状态改变，再执行后面的代码。
 */

// // 加载图片
// const imgElement = document.getElementById('img');

// /**
// * @description 加载图片
// * @param url 图片地址
// * @param resolve 成功回调
// * @param reject 失败回调
// * @return void
// * @status public
// */
// function loadImage(url, resolve, reject) {
//     var image = new Image();
//     image.onload = () => {
//         resolve(image);
//     };
//     image.onerror = reject;
//     image.src = url;
// }
// loadImage('https://tse1-mm.cn.bing.net/th/id/OIP-C.80_JMMUAmgciL_4ni93hGwHaEK?rs=1&pid=ImgDetMain',
//     (img) => {
//         console.log('图片加载成功');
//         imgElement.appendChild(img);
//     },
//     () => {
//         console.log('图片加载失败');
//     });

// // 定时器
// let i = 0;
// const timer = setInterval(() => {
//     console.log(i++);
//     if(i === 10) {
//         clearTimeout(timer);
//     }
// }, 100);

// // Promise，解决回调地狱
// function loadImagePromise(url) {
//     return new Promise((resolve, reject) => {
//         var image = new Image();
//         image.onload = () => {
//             // 成功
//             resolve(image);
//         };
//         // 失败
//         image.onerror = reject;
//         image.src = url;
//     });
// }
// loadImagePromise('https://tse1-mm.cn.bing.net/th/id/OIP-C.80_JMMUAmgciL_4ni93hGwHaEK?rs=1&pid=ImgDetMain').
//     then((img) => {
//         console.log('Promise图片加载成功');
//         imgElement.appendChild(img);
//     }).
//     catch(() => {
//         console.log('Promise图片加载失败');
//     });

// // ajax请求
import AJAX from "../module/AJAX.js";
// let options = {
//     params: {
//         key: "767311c5893e14831b1ac4e5dec435b7",
//         city: "440106"
//     },
//     headers: {
//         "Content-Type": "application/json"
//     }
// };
// AJAX.get("https://restapi.amap.com/v3/weather/weatherInfo", options).
//     then(res => {
//         console.log(res);
//     },
//     err => {
//         console.log(err);
//     });


// // 事件循环
// console.log('同步任务1');

// setTimeout(() => {
//   console.log('宏任务');
// }, 0);

// const promise = new Promise((resolve, reject) => {
//     resolve();
//     console.log('promise里的同步任务');
// });

// promise.then(() => {
//   console.log('微任务');
// });

// console.log('同步任务2');
// /**
//  * 输出结果：
//  * 同步任务1
//  * promise里的同步任务
//  * 同步任务2
//  * 微任务
//  * 宏任务
//  */

// // 在微任务里执行宏任务
// // setTimeout执行后才会调用resolve
// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('promise2宏任务');
//         resolve();
//       }, 0);
//       console.log('promise2里的同步任务');
// });
// promise2.then(() => {
//     console.log('promise2微任务');
// });
// /**
//  * 输出结果：
//  * promise2里的同步任务
//  * promise2宏任务
//  * promise2微任务
//  */

// // 网络请求是宏任务，等网络请求完成后调用promise的resolve方法，产生微任务
// setTimeout(() => {
//     console.log('宏任务');
//   }, 0);
// let options = {
//     params: {
//         key: "767311c5893e14831b1ac4e5dec435b7",
//         city: "440106"
//     },
//     headers: {
//         "Content-Type": "application/json"
//     }
// };
// AJAX.get("https://restapi.amap.com/v3/weather/weatherInfo", options).
//     then(res => {
//         console.log("微任务");
//     });
// /**
//  * 输出结果：
//  * 宏任务
//  * 微任务
//  */


// // promise的then方法返回一个新的promise，会返回新的promise的状态
// const promise3 = new Promise((resolve, reject) => {
//     resolve("成功");
// });
// const promise4 = new Promise((resolve, reject) => {
//     resolve(promise3);
// });
// promise4.then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * 成功
//  */

// // promise的状态是单一且不可逆的
// const promise5 = new Promise((resolve, reject) => {
//     // 只会执行第一个
//     resolve("成功");
//     reject("失败");
// });
// promise5.then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * 成功
//  */

// // promise的then也是一个promise，可以链式调用
// const promise6 = new Promise((resolve, reject) => {
//     resolve("成功");
// });
// promise6.then((res) => {
//     console.log(res);
//     return "成功2";
// }).then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * 成功
//  * 成功2
//  */

// // 链式调用的使用场景
// // 先请求用户信息，再请求用户的订单信息
// const promise7 = new Promise((resolve, reject) => {
//     resolve("用户信息");
// });
// const promise8 = new Promise((resolve, reject) => {
//     resolve("订单信息");
// });
// promise7.then((res) => {
//     console.log(res);
//     return promise8;
// }).then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * 用户信息
//  * 订单信息
//  */

// // promise的then方法只要返回的对象有then方法，就相当于返回的promise
// const promise9 = new Promise((resolve, reject) => {
//     resolve("成功");
// });
// const obj = {
//     then: function(resolve, reject) {
//         resolve("成功2");
//     }
// };
// const obj2 = class {
//     static then(resolve, reject) {
//         resolve("成功3");
//     }
// };
// promise9.then((res) => {
//     console.log(res);
//     return obj;
// }).then((res) => {
//     console.log(res);
//     return obj2;
// }).then((res) => {
//     console.log(res);
// });

// // promise的catch方法
// // 执行reject方法，会调用then的第二个参数和catch方法
// const promise10 = new Promise((resolve, reject) => {
//     reject("失败");
// });
// promise10.then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * 失败
//  */
// promise10.catch((err) => {
//     console.log("catch1" + err);
// });
// /**
//  * 输出结果：
//  * catch1失败
//  */
// promise10.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log("catch2" + err);
// });
// /**
//  * 输出结果：
//  * catch2失败
//  */
// // 既有then的第二个参数，又有catch方法，只会调用then的第二个参数
// promise10.then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err);
// }).catch((err) => {
//     console.log("catch3" + err);
// });
// /**
//  * 输出结果：
//  * 失败
//  */

// // 当程序异常时，会调用then的第二个参数和catch方法
// const promise11 = new Promise((resolve, reject) => {
//     n+1;
// });
// promise11.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err.message);
// });
// /**
//  * 输出结果：
//  * n is not defined
//  */
// const promise12 = new Promise((resolve, reject) => {
//     throw new Error("错误");
// });
// promise12.then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err.message);
// });
// /**
//  * 输出结果：
//  * 错误
//  */

// // Promise的finally方法
// // 不管promise的状态如何，都会执行finally方法
// // 可以使用finally方法来做正在加载的动画和一些清理工作
// const promise13 = new Promise((resolve, reject) => {
//     console.log("显示加载动画");
//     resolve("成功");
// });
// promise13.then((res) => {
//     console.log(res);
// }).finally(() => {
//     console.log("关闭加载动画1");
// });
// const promise14 = new Promise((resolve, reject) => {
//     reject("失败");
// });
// promise14.finally(() => {
//     console.log("关闭加载动画2");
// });
// /**
//  * 输出结果：
//  * 显示加载动画
//  * 成功
//  * 关闭加载动画1
//  * 关闭加载动画2
//  */

// // promise封装setTimeout
// function delay(time) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, time);
//     });
// }
// delay(1000).then(() => {
//     console.log('1s');
//     return delay(2000);
// }).then(() => {
//     console.log('3s');
// });
// /**
//  * 输出结果：
//  * 1s
//  * 3s
//  */

// // 构建扁平化的setInterval
// let i = 0;
// function interval(time, callback) {
//     return new Promise((resolve, reject) => {
//         let id = setInterval(() => {
//             callback(id, resolve);
//         }, time);
//     });
// }
// interval(1000, (id, resolve) => {
//     console.log(i++);
//     if(i === 10) {
//         clearInterval(id);
//         resolve();
//     }
// }).then(() => {
//     console.log('结束');
// });
/**
//  * 输出结果：
//  * 循环输出0-9
//  * 结束
//  */

// // 使用promise加载script脚本文件
// function loadScript(src) {
//     return new Promise((resolve, reject) => {
//         let script = document.createElement('script');
//         script.src = src;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.body.appendChild(script);
//     });
// }
// loadScript('https://cdn.bootcdn.net/ajax/libs/moment.js/2.30.1/locale/af.min.js').then(() => {
//     console.log('加载moment.js成功');
// }).catch(() => {
//     console.log('加载moment.js失败');
// });
// /**
//  * 输出结果：
//  * 加载moment.js成功
//  */

// // 使用promise的resolve方法，表示成功的状态
// Promise.resolve('成功').then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * 成功
//  */
// // 当反复请求相同数据时，可以使用promise的resolve方法返回本地缓存的数据，避免重复请求
// function query(url, options)
// {
//     const cacheMap = query.cacheMap || (query.cacheMap = new Map());
//     if(cacheMap.has(url))
//     {
//         console.log("走缓存");
//         return Promise.resolve(cacheMap.get(url));
//     }
//     return AJAX.get(url, options).
//     then(res => {
//         cacheMap.set(url, res);
//         console.log("没走缓存");
//         return res;
//     },
//     err => {
//         console.log(err);
//     });
// }
// let options = {
//     params: {
//         key: "767311c5893e14831b1ac4e5dec435b7",
//         city: "440106"
//     },
//     headers: {
//         "Content-Type": "application/json"
//     }
// };
// let url = "https://restapi.amap.com/v3/weather/weatherInfo";
// query(url, options).then(res => {
//     console.log(res);
//     return query(url, options);
// }).then(res => {
//     console.log(res);
// });

// // 使用promise的reject方法，表示失败的状态
// Promise.reject('失败').catch((err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * 失败
//  */

// // Promise.all方法
// // 当所有promise都成功时，返回所有promise的结果
// // 当有一个promise失败时，返回失败的promise的结果
function promiseFunc(res)
{
    return new Promise((resolve, reject) => {
        if(res.includes("失败"))
        {
            reject(res);
        }
        resolve(res);
    });
}
// let promiseArr = [promiseFunc("成功1"), promiseFunc("成功2"), promiseFunc("失败")];
// Promise.all(promiseArr).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * 失败
//  */
// let promiseArr1 = [promiseFunc("成功1"), promiseFunc("成功2"), promiseFunc("成功3")];
// Promise.all(promiseArr1).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * ["成功1", "成功2", "成功3"]
//  */

// // Promise.allSettled方法
// // 返回所有promise的结果，不管成功还是失败
// Promise.allSettled(promiseArr).then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * [{status: "fulfilled", value: "成功1"}, {status: "fulfilled", value: "成功2"}, {status: "rejected", reason: "失败"}]
//  */
// let promiseArr2 = [promiseFunc("失败1"), promiseFunc("失败2"), promiseFunc("失败3")];
// Promise.allSettled(promiseArr2).then((res) => {
//     console.log(res);
// });
// /**
//  * 输出结果：
//  * [{status: "rejected", reason: "失败1"}, {status: "rejected", reason: "失败2"}, {status: "rejected", reason: "失败3"}]
//  */

// // Promise.race方法
// // 返回最先完成的，不管成功还是失败，哪个快就返回哪个
// // 使用场景，请求超时逻辑，当请求超过一定时间还没有返回结果，就返回超时
// Promise.race(promiseArr).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// promise队列，按顺序执行
function queryCityWeather(city)
{
    let options = {
        params: {
            key: "767311c5893e14831b1ac4e5dec435b7",
            city: city
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
    let url = "https://restapi.amap.com/v3/weather/weatherInfo";
    return AJAX.get(url, options);
}
function getCityWeatherStr(weatherInfo)
{
    let province = weatherInfo.province;
    let city = weatherInfo.city;
    let humidity = weatherInfo.humidity;
    let temperature = weatherInfo.temperature;
    let weather = weatherInfo.weather;
    let winddirection = weatherInfo.winddirection;
    let windpower = weatherInfo.windpower;
    return province + city + "的天气：" + weather + "，温度：" + temperature + "，湿度：" + humidity + "，风向：" + winddirection + "，风力：" + windpower;
}

// // 每次执行完一个promise后在then里返回下一个promise
// queryCityWeather("441621").then((res) => {
//     if (res?.lives?.length > 0) {
//         console.log(getCityWeatherStr(res.lives[0]));
//     }
//     return queryCityWeather("440106");
// }).then((res) => {
//     if (res?.lives?.length > 0) {
//         console.log(getCityWeatherStr(res.lives[0]));
//     }
//     return queryCityWeather("445281");
// }).then((res) => {
//     if (res?.lives?.length > 0) {
//         console.log(getCityWeatherStr(res.lives[0]));
//     }
//     return promiseFunc("失败");
// }).catch((err) => {
//     console.log(err);
// });
// /**
//  * 输出结果：
//  * 广东紫金县的天气：阴，温度：30，湿度：70，风向：东，风力：≤3
//  * 广东天河区的天气：阴，温度：29，湿度：82，风向：东，风力：≤3
//  * 广东普宁市的天气：阴，温度：29，湿度：78，风向：东，风力：≤3
//  * 失败
//  */
// 封装promise队列
// function promiseQueue(promiseArr)
// {
//     let promise = promiseArr[0];
//     for(let i = 1; i < promiseArr.length; i++)
//     {
//         promise = promise.then((res) => {
//             if (res?.lives?.length > 0) {
//                 console.log(getCityWeatherStr(res.lives[0]));
//             }
//             return promiseArr[i];
//         }).catch((err) => {
//             console.log(err);
//         });
//     }
// }
// promiseQueue([queryCityWeather("441621"), queryCityWeather("440106"),
//     queryCityWeather("445281"), promiseFunc("失败")]);
// /**
//  * 输出结果：
//  * 广东紫金县的天气：阴，温度：30，湿度：70，风向：东，风力：≤3
//  * 广东天河区的天气：阴，温度：29，湿度：82，风向：东，风力：≤3
//  * 广东普宁市的天气：阴，温度：29，湿度：78，风向：东，风力：≤3
//  * 失败
//  */
// function promiseQueue1(promiseArr)
// {
//     promiseArr.reduce((prev, next) => {
//         return prev.then((res) => {
//             if (res?.lives?.length > 0) {
//                 console.log(getCityWeatherStr(res.lives[0]));
//             }
//             return next;
//         }).catch((err) => {
//             console.log(err);
//         });
//     });
// }
// promiseQueue1([queryCityWeather("441621"), queryCityWeather("440106"),
//     queryCityWeather("445281"), promiseFunc("失败")]);
/**
 * 输出结果：
 * 广东紫金县的天气：阴，温度：30，湿度：70，风向：东，风力：≤3
 * 广东天河区的天气：阴，温度：29，湿度：82，风向：东，风力：≤3
 * 广东普宁市的天气：阴，温度：29，湿度：78，风向：东，风力：≤3
 * 失败
 */

// async/await
// async的方法会返回一个promise，可以手动设置返回值
// 使用await时必须在方法声明前加async
// await之会同步当前函数的语法，对于外部函数来说，async函数还是异步执行的
// async function queryCityWeatherAsync(cityIds)
// {
//     for(let i = 0;i < cityIds.length; i++)
//     {
//         let cityId = cityIds[i];
//         // 进度条
//         console.log("当前进度：" + (i+1) + "/" + cityIds.length);
//         try {
//             const res = await queryCityWeather(cityId);
//             if (res?.lives?.length > 0 && res.lives[0].city) {
//                 console.log(getCityWeatherStr(res.lives[0]));
//             }
//             else
//             {
//                 console.log("查询失败");
//             }
//         }
//         catch(err)// 错误处理
//         {
//             console.log(err);
//         }
//     }
// }
// queryCityWeatherAsync(["441621","440106","4452811","445281"]);
/**
 * 输出结果：
 * 当前进度：1/4
 * 广东紫金县的天气：阴，温度：30，湿度：70，风向：东，风力：≤3
 * 当前进度：2/4
 * 广东天河区的天气：阴，温度：29，湿度：82，风向：东，风力：≤3
 * 当前进度：3/4
 * 查询失败
 * 当前进度：4/4
 * 广东普宁市的天气：阴，温度：29，湿度：78，风向：东，风力：≤3
 */
// // await并行执行
// async function queryCityWeatherAsync1(cityIds)
// {
//     let promiseArr = cityIds.map(cityId => queryCityWeather(cityId));
//     try {
//         let resArr = await Promise.all(promiseArr);
//         resArr.forEach((res) => {
//             if (res?.lives?.length > 0 && res.lives[0].city) {
//                 console.log(getCityWeatherStr(res.lives[0]));
//             }
//             else
//             {
//                 console.log("查询失败");
//             }
//         });
//     }
//     catch(err)
//     {
//         console.log(err);
//     }

// }
// queryCityWeatherAsync1(["441621","440106","4452811","445281"]);
// /**
//  * 输出结果：
//  * 广东紫金县的天气：阴，温度：30，湿度：70，风向：东，风力：≤3
//  * 广东天河区的天气：阴，温度：29，湿度：82，风向：东，风力：≤3
//  * 查询失败
//  * 广东普宁市的天气：阴，温度：29，湿度：78，风向：东，风力：≤3
//  */

// // 大任务拆分多个小任务
// async function queryCityWeatherAsync2(cityIds)
// {
//     let num = 0;
//     let allRes = [];
//     // 每次查询3个城市的天气
//     for(let i = 0;i < cityIds.length; i+=3)
//     {
//         let cityIdArr = cityIds.slice(i, i+3);
//         let promiseArr = cityIdArr.map(cityId => queryCityWeather(cityId));
//         let resArr = await Promise.all(promiseArr);
//         allRes.push(...resArr);
//         console.log("当前进度：" + (num+1) + "/" + Math.ceil(cityIds.length/3));
//         num++;
//     }
//     allRes.forEach((res) => {
//         if (res?.lives?.length > 0 && res.lives[0].city) {
//             console.log(getCityWeatherStr(res.lives[0]));
//         }
//         else
//         {
//             console.log("查询失败");
//         }
//     });
// }
// queryCityWeatherAsync2(["441621","440106","4452811","445281",
//     "440303","440304","440305","440306","440307","440308",
//     "440309","440310","440311"
// ]);
// /**
//  * 输出结果：
//  * 当前进度：1/5
//  * 当前进度：2/5
//  * 当前进度：3/5
//  * 当前进度：4/5
//  * 当前进度：5/5
//  * 广东紫金县的天气：阴，温度：26，湿度：87，风向：东，风力：≤3
//  * 广东天河区的天气：阴，温度：27，湿度：88，风向：东，风力：≤3
//  * 查询失败
//  * 广东普宁市的天气：阴，温度：26，湿度：91，风向：东北，风力：≤3
//  * 广东罗湖区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东福田区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东南山区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东宝安区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东龙岗区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东盐田区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东龙华区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东坪山区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  * 广东光明区的天气：小雨，温度：26，湿度：92，风向：东北，风力：≤3
//  */

// // 面试题1
// const first = () => (new Promise((resolve, reject) => {
//     console.log(3);
//     let p = new Promise((resolve, reject) => {
//         console.log(7);
//         setTimeout(() => {
//             console.log(5);
//             resolve(6);
//         }, 0);
//         resolve(1);        
//     });
//     resolve(2);
//     p.then((arg) => {
//         console.log(arg);
//     })
// }));
// first().then((arg) => {
//     console.log(arg);
// });
// console.log(4);
// // 输出结果：3 7 4 1 2 5

// 面试题2
setTimeout(() => {
    console.log(0);
}, 0);

new Promise((resolve, reject) => {
    console.log(1);
    resolve();
}).then(() => {
    console.log(2);
    new Promise((resolve,reject) => {
        console.log(3);
        resolve();
    }).then(() => {
        console.log(4);
    }).then(() => {
        console.log(5);
    })
}).then(() => {
    console.log(6);
});

new Promise((resolve, reject) => {
    console.log(7);
    resolve();
}).then(() => {
    console.log(8);
})
/**
 * promise的then方法也是异步的，得等当前层的promise执行完后才会链式调用
 * 输出结果：1 7 2 3 8 4 6 5 0
 */