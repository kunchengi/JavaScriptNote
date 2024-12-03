/**
 * 静态代理：可以找房东租房，也可以找中介租房
 */
// 房东类
class Homeowner {
    rentHouse() {
        console.log('租了一间房');
    }
}
// 中介代理类
class IntermediaryProxy {
    constructor(homeowner) {
        this.homeowner = homeowner;
    }
    rentHouse() {
        console.log('中介代理租房');
        this.homeowner.rentHouse();
    }
}
// 测试代码：
// 找房东租房
const homeowner = new Homeowner();
homeowner.rentHouse();
/**
 * 输出：
 * 租了一间房
 */
// 找中介租房
const intermediaryProxy = new IntermediaryProxy(homeowner);
intermediaryProxy.rentHouse();
/**
 * 输出：
 * 中介代理租房
 * 租了一间房
 */ 
