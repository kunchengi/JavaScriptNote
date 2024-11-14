/**
 * 生成器对象由生成器函数返回，并且它符合可迭代协议和迭代器协议
 * 生成器函数内部使用 yield 关键字，yield 关键字会暂停函数执行，并且返回一个值
 * value 属性返回 yield 后面的表达式的值，done 属性表示生成器是否已经完成
 */
// 定义生成器函数
function* generator() {
    console.log('Generator function is called');
    yield 1;
    yield 2;
    yield 3;
    console.log('Generator function is done');
}

// 创建生成器对象
const gen = generator();
console.log(gen.next());// Generator function is called { value: 1, done: false }
console.log(gen.next());// { value: 2, done: false }
console.log(gen.next());// { value: 3, done: false }
console.log(gen.next());// Generator function is done { value: undefined, done: true }


// 定义生成器函数
function* generator1() {
    console.log('跟着下面一行一起执行');
    yield 1;
    yield 2;
    yield 3;
    console.log('跟着下面一行一起执行1');
}

// 创建生成器对象
const gen1 = generator1();
// 迭代生成器对象，依次获取每个 yield 返回的值
for (const value of gen1) {
    console.log(value);
}
/**
 * 输出：
 * 跟着下面一行一起执行
 * 1
 * 2
 * 3
 * 跟着下面一行一起执行1
 */

// 生成器管理异步
function* asyncGenerator() {
    yield fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=767311c5893e14831b1ac4e5dec435b7&city=440106`);
    yield fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=767311c5893e14831b1ac4e5dec435b7&city=441621`);
    yield fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=767311c5893e14831b1ac4e5dec435b7&city=445281`);
}

const asyncGen = asyncGenerator();
// asyncGen.next().value.then(res => res.json()).then(data => console.log(data));
// asyncGen.next().value.then(res => res.json()).then(data => console.log(data));
// asyncGen.next().value.then(res => res.json()).then(data => console.log(data));

// 输出顺序不一定是yield执行顺序
for(const res of asyncGen)
{
    res.then(res => res.json()).then(data => console.log(data));
}