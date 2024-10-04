export default class AJAX {
    /**
    * @description 创建XMLHttpRequest对象
    * @param url 请求地址
    * @param options 请求配置
    * @param method 请求方式
    * @return void
    * @status public
    */
    static createXhr(url, options, method) {
        // 转换为大写
        method = method.toUpperCase();
        const xhr = new XMLHttpRequest();
        // 如果options不为空
        if (options) {
            // 初始化前缀
            let paramsStr = url.includes("?") ? "&" : "?";
            // 将options.params对象转换成?id=100&vip=7&
            for (let key in options.params) {
                paramsStr += `${key}=${params[key]}&`;
            }
            // 删除最后一个字符&
            paramsStr = paramsStr.slice(0, -1);
            url += paramsStr;
            // 设置请求头
            for (let key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
        }
        xhr.open(method, url);
        xhr.responseType = "json";
        return xhr;
    }

    /**
    * @description get请求
    * @param url 请求地址
    * @param options 请求配置
    * @return void
    * @status public
    */
    static get(url, options) {
        // 创建promise
        const p = new Promise((resolve, reject) => {
            //创建对象
            // 设置open和setRequestHeader
            const xhr = this.createXhr(url, options, "GET");
            //发送
            xhr.send();
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
                        //如果成功
                        resolve(xhr.response);
                    } else {//如果失败
                        reject(xhr.status);
                    }
                }
            }
        });
        return p;
    }

    /**
    * @description post请求
    * @param url 请求地址
    * @param body 请求体
    * @param options 请求配置
    * @return void
    * @status public
    */
    static post(url, body, options) {
        // 创建promise
        const p = new Promise((resolve, reject) => {
            // 设置open和setRequestHeader
            const xhr = this.createXhr(url, options, "POST");
            //发送
            xhr.send(JSON.stringify(body));
            //绑定事件,处理响应结果
            xhr.onreadystatechange = function () {
                //判断
                if (xhr.readyState === 4) {
                    //判断响应状态码
                    //200-300表示成功
                    if (xhr.status >= 200 && xhr.status <= 300) {
                        //如果成功
                        resolve({
                            status: xhr.status,
                            message: xhr.statusText,
                            body: xhr.response
                        });
                    } else {//如果失败
                        reject(xhr.status);
                    }
                }
            }
        });
        return p;
    }
}