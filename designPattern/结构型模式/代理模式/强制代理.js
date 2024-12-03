// 中介代理类
class IntermediaryProxy1 {
    constructor(homeowner) {
        this.homeowner = homeowner;
    }
    rentHouse() {
        this.homeowner.rentHouse();
    }
    getProxy() {
        return this;
    }
}
// 房东类
class Homeowner1 {
    constructor() {
        this.proxy = null;
    }
    rentHouse() {
        // 判断是否是代理
        if (this.isProxy()) {
            console.log('中介代理租房');
        }
        else {
            console.log('请找指定的中介租房');
        }
    }
    getProxy() {
        if (!this.proxy) {
            this.proxy = new IntermediaryProxy1(this);
        }
        return this.proxy;
    }
    isProxy() {
        return this.proxy != null;
    }
}
// 测试代码
// 直接通过房东无法租房
let homeowner1 = new Homeowner1();
homeowner1.rentHouse(); // 请找指定的中介租房
// 直接通过中介无法租房
let intermediaryProxy1 = new IntermediaryProxy1(homeowner1);
intermediaryProxy1.rentHouse(); // 请找指定的中介租房
// 通过房东找到中介租房
let intermediaryProxy2 = homeowner1.getProxy();
intermediaryProxy2.rentHouse(); // 中介代理租房

const iteratorObj = {
    arr: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if(index < this.arr.length)
                {
                    return {
                        value: this.arr[index++],
                        done: false
                    }
                }
                return {
                    done: true
                }
            }
        }
    }
}

for (let item of iteratorObj) {
    console.log(item);
}
/**
 * 输出：
 * 1
 * 2
 * 3
 */