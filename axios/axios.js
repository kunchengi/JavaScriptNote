/**
 * axios与Axios的关系
 * 1. 从语法上来说，axios是通过createInstance创建的，不是Axios的实例
 * 2. 从功能上来说，axios作为对象拥有Axios的属性和方法，是Axios的实例
 * 3. axios是Axios.prototype.request函数bind()返回的函数
 * createInstance里的instance与axios的区别
 * 1. 默认配置可能不一样
 * 2. instance没有axios后面添加的一些方法：create()/CancelToken()/all()
 */

/**
 * @description 创建axios实例
 * @param 
 * @return void
 * @status public
 */
function Axios(config){
    // 默认配置
    this.defaults = config;
    // 创建拦截器
    this.interceptors = {
        request: new InterceptorManager(),// 请求拦截器
        response: new InterceptorManager()// 响应拦截器
    }
}

/**
 * @description 拦截器管理器构造函数
 * @param 
 * @return void
 * @status public
 */
function InterceptorManager(){
    // 拦截器数组
    this.handlers = [];
}

/**
 * @description 添加拦截器
 * @param onFulfilled 成功回调
 * @param onRejected 失败回调
 * @return void
 * @status public
 */
InterceptorManager.prototype.use = function(onFulfilled, onRejected)
{
    // 添加拦截器
    this.handlers.push({
        fulfilled: onFulfilled,
        rejected: onRejected
    })
}

/**
 * @description 发送aiax请求
 * @param config 请求配置
 * @return void
 * @status public
 */
Axios.prototype.request = function(config){
    // 创建一个成功的promise，值为config
    let promise = Promise.resolve(config);
    // 创建一个promise回调函数链，两个为一组，第一个是成功的回调，第二个是失败的回调
    let chains = [dispatchRequest, undefined];
    // // 执行promise，返回的promise状态由dispatchRequest决定
    // let promise2 = promise.then(chains[0], chains[1]);
    // 将请求拦截器从压入到promise链的前面
    this.interceptors.request.handlers.forEach(item => {
        chains.unshift(item.fulfilled, item.rejected);
    });
    // 将响应拦截器压入到promise链的后面
    this.interceptors.response.handlers.forEach(item => {
        chains.push(item.fulfilled, item.rejected);
    });
    // 如果拦截器数组有值，分组执行promise
    console.log(this.interceptors.request.handlers);
    console.log(this.interceptors.response.handlers);
    while(chains.length)
    {
        promise = promise.then(chains.shift(), chains.shift());
    }
    // 返回promise
    return promise;
}

function dispatchRequest(config){
    // 调用适配器发送请求
    return xhrAdapter(config).then(response => {
        // 对响应的结果进行转换处理
        return transformResponse(response);
    }, error => {
        throw error;
    })
}

/**
 * @description xhr适配器
 * @param 
 * @return void
 * @status public
 */
function xhrAdapter(config){
    return new Promise((resolve, reject) => {
        // 创建xhr对象
        const xhr = new XMLHttpRequest();
        if (config.params) {
            // 初始化前缀
            let paramsStr = config.url.includes("?") ? "&" : "?";
            // 将params对象转换成?id=100&vip=7&
            for (let key in config.params) {
                paramsStr += `${key}=${config.params[key]}&`;
            }
            // 删除最后一个字符&
            paramsStr = paramsStr.slice(0, -1);
            // 将url拼接上paramsStr
            config.url += paramsStr;
        }

        // 初始化
        xhr.open(config.method, config.url);
        // 设置默认请求头
        xhr.setRequestHeader("Content-Type", "application/json");
        if(config.headers)
        {
            // 设置请求头
            for (let key in config.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
        }
        if(config.method === "POST" || config.method === "PUT" || config.method === "DELETE")
        {
            // 设置请求体
            xhr.send(JSON.stringify(config.data));
        }
        else {
            xhr.send();
        }
        // 设置响应类型
        xhr.responseType = "json";
        //绑定事件,处理响应结果
        xhr.onreadystatechange = function () {
            /**
             * 2: 完成请求的发送
             * 3: 正在接收响应
             * 4: 响应已经接收完毕
             */
            if (xhr.readyState === 4) {
                //判断响应状态码
                //200-300表示成功
                if (xhr.status >= 200 && xhr.status <= 300) {
                    // 设置为成功的状态
                    resolve({
                        // 配置对象
                        config: config,
                        // 响应体
                        data: xhr.response,
                        // 响应头
                        headers: xhr.getAllResponseHeaders(),
                        // 请求对象
                        request: xhr,
                        // 状态码
                        status: xhr.status,
                        // 状态文本
                        statusText: xhr.statusText
                    });
                } else {
                    // 设置为失败的状态
                    reject(new Error("请求失败，状态码为：" + xhr.statusText));
                }
            }
        }
        // 取消请求的处理
        // 如果配置了 cancelToken，那么就监听取消请求的事件
        if(config.cancelToken)
        {
            // 执行cancel()会改变cancelToken.promise的状态为成功，然后会执行成功的回调，取消请求
            config.cancelToken.promise.then(reason => {
                // 取消请求，关闭连接
                xhr.abort();
                // 抛出取消请求的异常
                reject(reason);
            })
        }
    })
}

/**
 * @description 响应结果转换处理
 * @param 
 * @return void
 * @status public
 */
function transformResponse(response){
    // 这边就不写了，直接返回吧
    return response;
}

/**
 * @description get请求
 * @param 
 * @return void
 * @status public
 */
Axios.prototype.get = function(url, config){
    return this.request(config);
}

/**
 * @description post请求
 * @param 
 * @return void
 * @status public
 */
Axios.prototype.post = function(url, data, config){
    return this.request(config);
}

/**
 * @description 创建axios实例
 * @param 
 * @return void
 * @status public
 */
function createInstance(config){
    // 创建axios实例
    // 此时可以使用context.get() 等方法，但不能使用context()
    var context = new Axios(config);
    // 使用bind把request方法的this指向context，并返回一个函数
    // 这样就可以使用instance()，但是不能使用instance.get()
    var instance = Axios.prototype.request.bind(context);
    // 将原型上的方法拷贝到instance上
    // 此时可以使用instance.get()，也可以使用instance()
    // 但是没有defaults和interceptors属性
    extend(instance, Axios.prototype, context);
    // 拷贝context身上的属性
    extend(instance, context);
    return instance;
}

/**
 * @description 拷贝对象
 * @param to 目标对象
 * @param from 源对象
 * @param thisObj this指向
 * @return void
 * @status public
 */
function extend(to, from, thisObj){
    // 遍历源对象
    for(var key in from){
        // 将元对象的方法拷贝到目标对象，并绑定this指向
        // 如果是函数，则绑定this指向
        if(typeof from[key] === 'function' && thisObj){
            to[key] = from[key].bind(thisObj);
        }else
        {
            to[key] = from[key];
        }
    }
}

axios = createInstance();

/**
 * @description CancelToken的构造函数
 * @param 
 * @return void
 * @status public
 */
axios.CancelToken = function(executor){
    // 创建一个promise
    let promise = new Promise((resolve, reject) => {
        // 执行executor回调函数 ，并传入resolve
        executor(resolve);
    })
    // 暴露promise
    this.promise = promise;
}

axios.interceptors.request.use(config => {
    console.log('请求拦截1成功');
    // 在这可以修改config
    // 返回配置对象
    return config;
}, error => {
    console.log('请求拦截1失败');
    // 返回错误对象
    return Promise.reject(error);
})

axios.interceptors.request.use(config => {
    console.log('请求拦截2成功');
    // 返回配置对象
    return config;
}, error => {
    console.log('请求拦截2失败');
    // 返回错误对象
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    console.log('响应拦截成功1');
    console.log(response);
    // 在这可以返回想要的东西
    // 返回响应对象的data属性
    return response;
}, error => {
    console.log('响应拦截失败1');
    // 返回错误对象
    return Promise.reject(error);
})

axios.interceptors.response.use(response => {
    console.log('响应拦截成功2');
    // 由于上面响应拦截器返回的是响应对象的data属性，所以这里的response实际上也是data
    // 返回响应对象
    return response;
}, error => {
    console.log('响应拦截失败2');
    // 返回错误对象
    return Promise.reject(error);
})

axios({
    method: 'GET',
    url: 'http://localhost:3000/posts?id=1'
}).then(res =>{
    console.log(res);
})

const btns = document.querySelectorAll('button');
console.log(btns);
let cancel = null;
btns[7].addEventListener('click', function () {
    console.log('点击取消请求');
    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts?id=1',
        // 设置取消请求的cancelToken
        cancelToken: new axios.CancelToken(c => {
            // 保存cancel方法
            cancel = c;
        })
    }).then(res =>{
        console.log(res);
    })
});
btns[8].addEventListener('click', function () {
    cancel && cancel();
});
