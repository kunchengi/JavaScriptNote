const btns = document.querySelectorAll('button');

// 发送GET请求获取第一篇文章
btns[0].addEventListener('click', function () {
	axios({
        method: 'GET',
        url: 'http://localhost:3000/posts?id=1'
	}).then(res =>{
        console.log(res);
    })
});

// 发送POST请求添加文章
// 坑：使用live server打开的页面，发送POST请求会自动刷新页面
// 解决：不使用live server
btns[1].addEventListener('click', function (e) {
	axios({
        method: 'POST',
        url: 'http://localhost:3000/posts',
        data: {
            "title": "随便写点东西",
            "author": "typicode"
        }
	}).then(res =>{
        console.log(res);
    })
});

// 发送PUT请求修改文章
btns[2].addEventListener('click', function () {
	axios({
        method: 'PUT',
        url: 'http://localhost:3000/posts/473d',// 修改id为473d的文章
        data: {
            "title": "法外狂徒",
            "author": "李四"
        }
	}).then(res =>{
        console.log(res);
    })
});

// 发送DELETE请求删除文章
btns[3].addEventListener('click', function () {
	axios({
        method: 'DELETE',
        url: 'http://localhost:3000/posts/473d'// 删除id为473d的文章
	}).then(res =>{
        console.log(res);
    })
});

// 使用get方法获取文章列表，参数为要请求的url
btns[4].addEventListener('click', function () {
    axios.get('http://localhost:3000/posts').then(res => {
        console.log(res);
    })
});

// 使用post方法添加文章
btns[5].addEventListener('click', function () {
    // 第一个参数为url，第二个参数为数据，第三个参数为配置项
    axios.post('http://localhost:3000/posts', {
        "title": "山上有座庙",
        "author": "小和尚"
    }).then(res => {
        console.log(res);
    })
});


// 响应对象的结构
// {
//     "data": 响应体，请求结果
//     "status": 响应的状态码,
//     "statusText": 响应的状态字符串,
//     "headers": 响应头,
//     "config": 配置项,
//     "request": 原生的ajax请求对象
// }

// 默认配置
// 默认用GET请求
axios.defaults.method = 'GET';
// 设置请求的基地址
axios.defaults.baseURL = 'http://localhost:3000';
// 设置默认的请求头
axios.defaults.headers = {
    "Content-Type": "application/json"
}
// 设置默认的请求参数
axios.defaults.params = {
    "id": "2"
}
// 设置默认的超时时间，5秒之后如果没有响应就取消请求
axios.defaults.timeout = 5000;


// 创建一个类似于axios的实例，方便发送请求
btns[6].addEventListener('click', function () {
    const weatherInfo = axios.create({
        baseURL: 'https://restapi.amap.com',
        timeout: 5000
    });
    weatherInfo({
        url: '/v3/weather/weatherInfo',
        params: {
            key: '767311c5893e14831b1ac4e5dec435b7',
            city: '440106'
        }
    }).then(res =>{
        console.log(res);
    })
    weatherInfo.get('/v3/weather/weatherInfo', {
        params: {
            key: '767311c5893e14831b1ac4e5dec435b7',
            city: '440105'
        }
    }).then(res =>{
        console.log(res);
    });
});


// axios拦截器：请求拦截器和响应拦截器
// 设置请求拦截器，在请求发送之前，可以做一些事情
// 请求拦截器后进先执行：设置多个请求拦截器，会先执行后面设置的拦截器，即先执行请求拦截2再执行请求拦截1
// 响应拦截器先进先执行：设置多个响应拦截器，会先执行前面设置的拦截器，即先执行响应拦截1再执行响应拦截2
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

// 设置响应拦截器，在响应返回之后，可以做一些事情
axios.interceptors.response.use(response => {
    console.log('响应拦截成功1');
    console.log(response);
    // 在这可以返回想要的东西
    // 返回响应对象的data属性
    return response.data;
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
    url: '/posts?id=1'
}).then(res =>{
    console.log(res);
})


// 取消请求
let cancel = null;
btns[7].addEventListener('click', function () {
    axios({
        url: '/posts?id=1',
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

// 取消重复请求
let cancelRequest = new Map();
btns[9].addEventListener('click', function () {
    // 如果已经存在请求，则不发送请求
    if(cancelRequest.has('cancel'))
    {
        return;
    }
    axios({
        url: '/posts?id=1',
        // 设置取消请求的cancelToken
        cancelToken: new axios.CancelToken(c => {
            // 保存cancel方法
            cancelRequest.set('cancel', c);
        })
    }).then(res =>{
        console.log(res);
        // 删除cancel方法
        cancelRequest.delete('cancel');
    })
});