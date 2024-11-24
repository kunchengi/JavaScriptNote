/**
 * 函数柯里化:
 *  - 把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数
 *  - 并且返回接受余下的参数而且返回结果的新函数
 * 说人话的解释：
 *  - 将 多参数函数 变成 单参数函数 一个一个传递
 *  - 会返回新函数，接受余下的参数，返回结果
 *  - 如sum(1,2) --> sum(1)(2)
 */

// sum函数柯里化
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2));

/**
* 思路：
*  - 定义单参数函数
*  - 返回新函数，接受一个参数，返回结果
*/
function currySum(a) {
    // 返回新函数，传递下一层参数
    return function (b) {
        // 返回结果
        return a + b;
    };
}
console.log(currySum(1)(2));

function currySum2(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}
console.log(currySum2(1)(2)(3));

/**
* @description 生成累加num次函数
* @param num 累加次数
* @return void
* @status public
*/
function sumMaker(num){
    let nums = [];
    // 这里利用了闭包特性，每次传入的参数都会被收集起来
    return function sum(...args){
        // 将当前传入的参数放入数组
        nums.push(...args);
        // 如果收集到足够的参数
        if(nums.length>=num)
        {
            // 拿到对应长度的参数进行累加
            let res = nums.slice(0, num).reduce((a,b)=>a+b);
            // 清空数组
            nums = [];
            // 返回结果
            return res;
        }else{// 否则返回自身，等待下一次调用
            return sum;
        }
    }
}
const sum6 = sumMaker(6);
console.log(sum6(1)(2,3)(4,5,6));

/**
* @description 将函数进行柯里化
* @param {Function} fn
* @return void
* @status public
*/
function curry(fn) {
    // 获取原函数的参数长度
    const arity = fn.length;
    // 返回一个递归函数
    return function curried(...args) {
        // 如果提供的参数数量已经达到原函数的要求
        if (args.length >= arity) {
            // 直接调用原函数并返回结果
            return fn(...args);
        } else {
            // 否则返回一个新的函数，等待更多的参数
            return function(...moreArgs) {
                // 合并已有的参数和新的参数
                return curried.apply(this, args.concat(moreArgs));
            };
        }
    };
}

function sum5(a, b, c, d, e) {
    return a + b + c + d + e;
}

const currySum5 = curry(sum5);

console.log(currySum5(1)(2)(3)(4)(5)); // 输出: 15
console.log(currySum5(1, 2)(3, 4, 5)); // 输出: 15
console.log(currySum5(1, 2, 3)(4)(5)); // 输出: 15