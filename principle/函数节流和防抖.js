/**
 * 问题：
 * 一些浏览器事件频繁触发会造成页面卡顿，如window的onresize、scroll、mousemove等。
 * 频繁请求后台接口会造成网络阻塞，对服务器造成压力。
 * 节流和防抖是解决这类问题的一种解决方案。
 * throttle节流：
 * 1、在函数执行一次后，之后大于设定的时间间隔后才能再次执行。
 * 2、适合多次事件按时间做平均分配触发，如窗口调整（resize）、页面滚动（scroll）、鼠标移动（mousemove）、抢购疯狂点击（click）等。
 * 3、使用：throttle(fn, wait)
 * debounce防抖：
 * 1、在规定时间内，只让最后一次生效，前面的不生效，每次触发，都重新计时。
 * 2、适合多次事件一次响应的情况，如搜索框输入，提交表单等。
 * 3、使用：debounce(fn, wait)
 */

/**
 * @description 节流(使用时间戳)
 * @param fn 需要节流的函数
 * @param wait 间隔时间
 * @return void
 * @status public
 */
export function throttle(fn, wait = 0)
{
    // 定义开始时间
    let startTime = 0;
    // 返回结果是一个函数，参数是事件对象
    return function (...args) {
        let curTime = Date.now();
        // 判断时间间隔
        if (curTime - startTime >= wait) {
            // 执行回调函数
            fn.apply(this, ...args);
            // 更新开始时间
            startTime = curTime;
        }
    }
}

/**
* @description 节流2(使用setTimeout)
* @param 
* @return void
* @status public
*/
function throttle2(fn, wait = 0) {
    // 缓存一个定时器id
    let timer = null;
    // 返回结果是一个函数，参数是事件对象
    return function (...args) {
        // 已经有定时器，不执行
        if(timer) return;
        // 创建一个定时器，wait后执行回调函数
        timer = setTimeout(() => {
            fn.apply(this, args);
            // 执行回调后清除定时器记录
            timer = null;
        },wait)
    }
}

// 绑定滚动事件(未使用节流)
// window.addEventListener('scroll',function () {
//     console.log(Date.now());
// });
// 绑定滚动事件(使用节流)
// window.addEventListener('scroll', throttle(function (e) {
//     console.log(e);
// }, 500));

/**
 * @description 函数防抖
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 延迟时间
 * @return void
 * @status public
 */
export function debounce(fn, wait = 0) {
    // 缓存一个定时器id
    let timer = null;
    // 返回结果是一个函数，参数是事件对象
    return function (...args) {
        // 清除之前的定时器，使用新的事件对象
        if(timer) clearTimeout(timer);
        // 创建一个定时器，wait后执行回调函数
        timer = setTimeout(() => {
            fn.apply(this, args);
            // 执行回调后清除定时器
            timer = null;
        }, wait);
    }
}

// const input = document.querySelector('input');
// // 未使用防抖
// // input.onkeydown = function (e) {
// //     console.log(e.keyCode);
// // };
// // 使用防抖
// input.onkeydown = debounce(function (e) {
//     console.log(e.keyCode);
// }, 500);
