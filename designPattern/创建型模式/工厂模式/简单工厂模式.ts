/**
 * 工厂模式：
 *  - 定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
 *  - 在创建对象时不会对客户端暴露创建逻辑，而是通过使用一个共同的接口来指向新创建的对象。
 *  - 当用到大量的创建某种、某类或某批对象时，就会使用到工厂模式
 */
/**
 * 简单工厂模式:
 *  - 简单工厂模式也叫静态工厂模式，它属于类创建型模式。
 *  - Pizza类，定义了prepare（准备原材料）的抽象方法，有bake（烤）、cut（切）、pack（打包）三个通用方法
 *  - CheesePizza、GreekPizza、PepperPizza类继承Pizza类，分别实现prepare方法，准备不同的原材料
 *  - SimpleFactory简单工厂类有createPizza方法根据入参创建不同的Pizza对象
 */
/**
* @description 披萨类
* @author chenkuncheng
* @date 2024-11-24 22:40:28
* @lastEditTime 2024-11-2422:40:28
* @lastEditors chenkuncheng
* @filePath designPattern\工厂模式.js
*/
class Pizza1{
    constructor(){
        
    }
    /**
    * @description 准备原材料
    * @param 
    * @return void
    * @status public
    */
    public prepare():void
    {

    }

    /**
    * @description 烤
    * @param 
    * @return void
    * @status public
    */
    public bake():void
    {

    }

    /**
    * @description 切
    * @param 
    * @return void
    * @status public
    */
    public cut():void
    {

    }

    /**
    * @description 打包
    * @param 
    * @return void
    * @status public
    */
    public pack():void
    {

    }
}

/**
* @description 奶酪披萨
* @author chenkuncheng
* @date 2024-11-24 22:40:22
* @lastEditTime 2024-11-2422:40:22
* @lastEditors chenkuncheng
* @filePath designPattern\工厂模式.js
*/
class CheesePizza extends Pizza1{
    constructor(){
        super();
    }
    public prepare():void
    {
        console.log('准备奶酪披萨的原材料');
    }
}

/**
* @description 蔬菜披萨
* @author chenkuncheng
* @date 2024-11-24 22:40:36
* @lastEditTime 2024-11-2422:40:36
* @lastEditors chenkuncheng
* @filePath designPattern\工厂模式.js
*/
class VeggiePizza extends Pizza1{
    constructor(){
        super();
    }
    public prepare():void
    {
        console.log('准备蔬菜披萨的原材料');
    }
}

/**
* @description 胡椒披萨
* @author chenkuncheng
* @date 2024-11-24 22:41:15
* @lastEditTime 2024-11-2422:41:15
* @lastEditors chenkuncheng
* @filePath designPattern\工厂模式.js
*/
class PerperPizza extends Pizza1{
    constructor(){
        super();
    }
    public prepare():void
    {
        console.log('准备胡椒披萨的原材料');
    }
}

/**
* @description 简单披萨工厂
* @author chenkuncheng
* @date 2024-11-24 22:41:32
* @lastEditTime 2024-11-2422:41:32
* @lastEditors chenkuncheng
* @filePath designPattern\工厂模式.js
*/
class SimplePizzaFactory{
    constructor(){

    }
    public createPizza(type:string):Pizza1|null
    {
        switch (type) {
            case 'cheese':
                return new CheesePizza();
            case 'veggie':
                return new VeggiePizza();
            case 'perper':
                return new PerperPizza();
            default:
                return null;
        }
    }
}

// 测试
const factory = new SimplePizzaFactory();
const cheesePizza = factory.createPizza('cheese');
if(cheesePizza)
{
    cheesePizza.prepare();// 准备奶酪披萨的原材料
}