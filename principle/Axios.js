/**
 * PUT 请求：
 * 可以更新整个资源。
 * 客户端需要发送完整的资源内容。
 * 如果服务器上不存在该资源，则会创建一个新的资源。
 * PUT 请求具有幂等性，即执行多次 PUT 请求的结果应该相同
 * POST 请求：
 * 可以创建新的资源或提交数据到服务器进行处理。
 * 客户端可以只发送部分资源内容。
 * 如果请求成功，服务器会返回一个表示新资源的 URI。
 * POST 请求不具有幂等性。
 * put和post请求的区别
 * 1. put通常用于更新或替换服务器上的资源。
 * 2. post通常用于创建新的资源或提交数据到服务器进行处理。
 */
/**
 * @description 执行请求
 * @param method 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @param headers 请求头
 * @param data 请求体
 * @return void
 * @status public
 */
export function axios({ method, url, params, headers, data}) {
    // 转换成大写
    method = method.toUpperCase();
    return new Promise((resolve, reject) => {
        // 创建xhr对象
        const xhr = new XMLHttpRequest();
        if (params) {
            // 初始化前缀
            let paramsStr = url.includes("?") ? "&" : "?";
            // 将params对象转换成?id=100&vip=7&
            for (let key in params) {
                paramsStr += `${key}=${params[key]}&`;
            }
            // 删除最后一个字符&
            paramsStr = paramsStr.slice(0, -1);
            // 将url拼接上paramsStr
            url += paramsStr;
        }

        // 初始化
        xhr.open(method, url);
        // 设置默认请求头
        xhr.setRequestHeader("Content-Type", "application/json");
        if(headers)
        {
            // 设置请求头
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        if(axios.isNeedBody(method))
        {
            // 设置请求体
            xhr.send(JSON.stringify(data));
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
                        status: xhr.status,
                        message: xhr.statusText,
                        body: xhr.response
                    });
                } else {
                    // 设置为失败的状态
                    reject(new Error("请求失败，状态码为：" + xhr.statusText));
                }
            }
        }
    });
}

/**
 * @description 判断是否需要请求体
 * @param method 请求方法
 * @return void
 * @status public
 */
axios.isNeedBody = function (method)
{
    return method === "POST" || method === "PUT" || method === "DELETE";
}

axios.request = function (method, url, options) {
    return axios({
        method: method,
        url: url,
        params: options?.params,
        headers: options?.headers,
        data: options?.data
    });
}

/**
 * @description get请求
 * @param url 请求地址
 * @param options 请求参数
 * @return void
 * @status public
 */
axios.get = function (url, options) {
    return axios.request("GET", url, options);
}

/**
 * @description post请求
 * @param url 请求地址
 * @return void
 * @status public
 */
axios.post = function (url, options) {
    return axios.request("POST", url, options)
}

axios.put = function (url, options) {
    return axios.request("PUT", url, options)
}

axios.delete = function (url, options) {
    return axios.request("DELETE", url, options)
}

// axios({
//     method: 'GET',
//     url: 'https://restapi.amap.com/v3/weather/weatherInfo',
//     params: {
//         key: '767311c5893e14831b1ac4e5dec435b7',
//         city: '440106',
//     }
// }).then(res => {
//     console.log(res);
// },(err) => {
//     console.log(err);
// })

// axios({
//     // 请求方法
//     method: 'POST',
//     // 请求地址
//     url: 'http://127.0.0.1',
//     // 请求参数
//     params: {
//         a: 1,
//         b: 2
//     },
//     // 请求体
//     data: {
//         c: 3,
//         d: 4
//     }
// }).then(res => {
//     console.log(res);
// },(err) => {
//     console.log(err);
// })


// let options = {
//     params: {
//         key: "767311c5893e14831b1ac4e5dec435b7",
//         city: "440105"
//     },
//     headers: {
//         "Content-Type": "application/json"
//     }
// };

// axios.get('https://restapi.amap.com/v3/weather/weatherInfo',options).then(res => {
//     console.log("GET");
//     console.log(res);
// },(err) => {
//     console.log(err);
// })

// axios.post('https://restapi.amap.com/v3/weather/weatherInfo',options).then(res => {
//     console.log("POST");
//     console.log(res);
// },(err) => {
//     console.log(err);
// })

// axios.put('http://127.0.0.1').then(res => {
//     console.log(res);
// },(err) => {
//     console.log(err);
// })

// axios.delete('http://127.0.0.1').then(res => {
//     console.log(res);
// },(err) => {
//     console.log(err);
// })