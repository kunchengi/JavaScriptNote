// 使用mutationObserver监听节点的变化，通过微任务触发
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
const observer = new MutationObserver(function() {
    console.log('微任务')
})
// 创建节点
const target = document.createElement('div');
// 添加元素监听，参数1：监听的节点，参数2：配置对象
observer.observe(target, {
    attributes: true,// 监听属性变化
    childList: true,// 监听子节点变化
    characterData: true// 监听文本节点变化
})
// 模拟修改节点，此时会触发微任务
target.innerHTML = '123'
setTimeout(() => {
    console.log('宏任务');
}, 0)
console.log("同步代码");
/**
 * 输出：
 * 同步代码
 * 微任务
 * 宏任务
 */