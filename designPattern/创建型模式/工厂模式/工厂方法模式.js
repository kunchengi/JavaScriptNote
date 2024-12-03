/**
 * 工厂方法模式
 *  - 定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。
 *  - Pizza类，定义了prepare（准备原材料）的抽象方法，有bake（烤）、cut（切）、pack（打包）三个通用方法
 *  - LDPepperPizza、LDCheesePizza、BJPepperPizza、BJCheesePizza类继承Pizza类，分别实现prepare方法，准备不同的原材料
 *  - OrderPizza 类有createPizza 抽象方法，构造函数中执行createPizza 方法
 *  - LDOrderPizza、BJOrderPizza类继承OrderPizza， 实现createPizza 方法，根据不同的类型创建Pizza
 *  - 通过new LDOrderPizza()、new BJOrderPizza()创建不同的Pizza
 */
class Pizza {
    constructor() {
    }
    /**
    * @description 准备原材料
    * @param
    * @return void
    * @status public
    */
    prepare() {
    }
    /**
    * @description 烤
    * @param
    * @return void
    * @status public
    */
    bake() {
    }
    /**
    * @description 切
    * @param
    * @return void
    * @status public
    */
    cut() {
    }
    /**
    * @description 打包
    * @param
    * @return void
    * @status public
    */
    pack() {
    }
}
class LDPepperPizza extends Pizza {
    constructor() {
        super();
    }
    prepare() {
        console.log("给伦敦胡椒披萨准备原材料");
    }
}
class LDCheesePizza extends Pizza {
    constructor() {
        super();
    }
    prepare() {
        console.log("给伦敦奶酪披萨准备原材料");
    }
}
class NYPepperPizza extends Pizza {
    constructor() {
        super();
    }
    prepare() {
        console.log("给纽约胡椒披萨准备原材料");
    }
}
class NYCheesePizza extends Pizza {
    constructor() {
        super();
    }
    prepare() {
        console.log("给纽约奶酪披萨准备原材料");
    }
}
class OrderPizza {
    constructor(type) {
        this.pizza = null;
        this.orderType = type;
        this.createPizza();
    }
    createPizza() {
    }
}
class LDOrderPizza extends OrderPizza {
    constructor(type) {
        super(type);
    }
    createPizza() {
        switch (this.orderType) {
            case "cheese":
                this.pizza = new LDCheesePizza();
                break;
            case "pepper":
                this.pizza = new LDPepperPizza();
                break;
            default:
                break;
        }
    }
}
class NYOrderPizza extends OrderPizza {
    constructor(type) {
        super(type);
    }
    createPizza() {
        switch (this.orderType) {
            case "cheese":
                this.pizza = new NYCheesePizza();
                break;
            case "pepper":
                this.pizza = new NYPepperPizza();
                break;
            default:
                break;
        }
    }
}
// 测试代码
let ldOrderPizza = new LDOrderPizza("cheese");
if (ldOrderPizza.pizza != null) {
    ldOrderPizza.pizza.prepare(); // 给伦敦奶酪披萨准备原材料
}
