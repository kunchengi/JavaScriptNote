// 获取当前时间
const now = new Date();
console.log(now); // Fri May 17 2024 22:14:13 GMT+0800 (中国标准时间)
console.log(typeof now); // object
const nowTime = Date();
console.log(nowTime); // Fri May 17 2024 22:14:13 GMT+0800 (中国标准时间)
console.log(typeof nowTime); // string
// 获取时间戳
console.log(Date.now()); // 1715955423611
console.log(now.getTime()); // 1715955423611
console.log(now * 1); // 1715955423611
console.log(now.valueOf()); // 1715955423611
// 获取脚本执行时间
console.time("test");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("test"); // test: 1.502197265625 ms
// 传时间戳获取指定时间
console.log(new Date(0)); // Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
// 传年月日时分秒获取指定时间，月份从0开始
const param = [2024, 4, 20, 13, 14, 0, 20];
console.log(new Date(...param)); // Mon May 20 2024 13:14:00 GMT+0800 (中国标准时间)
// 传时间格式字符串获取指定时间
const loveTime = new Date("2024-05-20 13:14:00");
console.log(loveTime); // Mon May 20 2024 13:14:00 GMT+0800 (中国标准时间)
// 获取年份
console.log(loveTime.getFullYear()); // 2024
// 获取月份, 0 ~ 11
console.log(loveTime.getMonth()); // 4
// 获取日期, 1 ~ 31
console.log(loveTime.getDate()); // 20
// 获取星期, 0 ~ 6, 0为星期天
console.log(loveTime.getDay()); // 1
// 获取小时, 0 ~ 23
console.log(loveTime.getHours()); // 13
// 获取分钟, 0 ~ 59
console.log(loveTime.getMinutes()); // 14
// 获取秒, 0 ~ 59
console.log(loveTime.getSeconds()); // 0
// 获取毫秒, 0 ~ 999
console.log(loveTime.getMilliseconds()); // 0

// 时间格式化
function formatDate(date, format = "YYYY-MM-DD HH:mm:ss") 
{
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()
    }
    for(let key in config)
    {
        format = format.replace(key, config[key]);
    }
    return format;
}
console.log(formatDate(loveTime)); // 2024-05-20 13:14:00
console.log(formatDate(loveTime, "YYYY年MM月DD日 HH时mm分ss秒")); // 2024年5月20日 13时14分0秒

// 使用第三方库moment.js格式化时间
let currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
console.log(currentTime); // 2024-05-17 22:14:13
// 10天后的时间
let tenDaysLater = moment().add(10, "days").format("YYYY-MM-DD HH:mm:ss");
console.log(tenDaysLater); // 2024-05-27 22:14:13