// 使用queueMicrotask添加微任务
setTimeout(() => {
  console.log('宏任务');
}, 0);
queueMicrotask(() => {
  console.log('微任务');
});
console.log("同步代码");
/**
 * 输出：
 * 同步代码
 * 微任务
 * 宏任务
 */