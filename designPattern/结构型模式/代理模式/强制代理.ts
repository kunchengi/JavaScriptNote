// 租房接口
interface IRentHouse1{
    // 租房
    rentHouse():void;
    // 获取代理
    getProxy():IntermediaryProxy1;
}

// 中介代理类
class IntermediaryProxy1 implements IRentHouse1{
    private homeowner:Homeowner1;

    constructor(homeowner:Homeowner1){
        this.homeowner = homeowner;
    }

    public rentHouse():void
    {
        this.homeowner.rentHouse();
    }

    public getProxy():IntermediaryProxy1
    {
        return this;
    }

}

// 房东类
class Homeowner1 implements IRentHouse1{

    private proxy:IntermediaryProxy1|null = null;
    constructor()
    {

    }

    public rentHouse():void
    {
        // 判断是否是代理
        if(this.isProxy())
        {
            console.log('中介代理租房');
        }
        else
        {
            console.log('请找指定的中介租房');
        }
    }

    public getProxy():IntermediaryProxy1
    {
        if(!this.proxy)
        {
            this.proxy = new IntermediaryProxy1(this);
        }
        return this.proxy;
    }

    public isProxy():boolean
    {
        return this.proxy != null;
    }
}

// 测试代码
// 直接通过房东无法租房
let homeowner1 = new Homeowner1();
homeowner1.rentHouse();// 请找指定的中介租房

// 直接通过中介无法租房
let intermediaryProxy1 = new IntermediaryProxy1(homeowner1);
intermediaryProxy1.rentHouse();// 请找指定的中介租房

// 通过房东找到指定的中介租房
let intermediaryProxy2 = homeowner1.getProxy();
intermediaryProxy2.rentHouse();// 中介代理租房
