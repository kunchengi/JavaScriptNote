/**
 * fetch: 浏览器内置api，用于发送网络请求
 * AJAX: 基于XMLHttpRequest收发请求，使用较为繁琐
 * axios: 基于promise的请求客户端，在浏览器和node中均可使用，使用简便，功能强大
 * fetch: 基于promise，用法和axios类似，但更简单
 */
async function fetchTest() {
    // 创建请求参数对象
    const params = new URLSearchParams({key: "767311c5893e14831b1ac4e5dec435b7", city: "440106"});
    console.log(params.toString());// key=767311c5893e14831b1ac4e5dec435b7&city=440106
    const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?${params}`);
    if(res.status >= 200 && res.status < 300)
    {
        const data = await res.json();
        console.log(data);
    }
}
fetchTest();

// fatch提交fomrData上传图片
const btn = document.querySelector('.ipt');
btn.addEventListener('change', async function () {
    const img = this.files[0];
    const data = new FormData();
    data.append('img', img);
    const res = await fetch('http://hmajax.itheima.net/api/uploadimg', {
        method: 'POST',
        body: data
    });
    const resData = await res.json();
    const icon = document.querySelector('.icon');
    icon.src = resData.data.url;
});

function fetchJson() {
    // 创建headers对象
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
        "title": "2024/11/01",
        "author": "ckc"
    }
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data));
}
// fetchJson()