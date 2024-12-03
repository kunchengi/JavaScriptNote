// 租房接口
interface IRentHouse{
    // 租房
    rentHouse():void;
}

// 房东类
class Homeowner implements IRentHouse{
    public rentHouse():void{
        console.log('租了一间房');
    }
}

// 中介代理类
class IntermediaryProxy implements IRentHouse{
    // 房东对象
    private homeowner:Homeowner;
    constructor(homeowner:Homeowner){
        this.homeowner = homeowner;
    }

    public rentHouse():void{
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