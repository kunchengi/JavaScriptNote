
class Validate{
    max(value, max){
        return Number(value) <= Number(max);
    }
    min(value, min){
        return Number(value) >= Number(min);
    }
    isNumber(value){
        return /^\d+$/.test(value);
    }
}

function ProxyFactory(target){
    return new Proxy(target, {
        get(obj, key){
            return obj[key];
        },
        set(obj, key, element){
            let ruleStr = element.getAttribute("rule");
            let eleValue = element.value;
            if(ruleStr && eleValue)
            {
                const validate = new Validate();
                let rules = ruleStr.split(",");
                rules.forEach(rule => {
                    let [ruleName, ruleValue] = rule.split(":");
                    if(!validate[ruleName](eleValue, ruleValue)){
                        throw new Error(`输入的值不符合${ruleName}：${ruleValue || ""}的规则`);
                    }
                });
            }
            obj[key] = element;
            return true;
        }
    });
}
// 获取属性名为validate的元素
const validateElements = document.querySelectorAll("[validate]");
// 创建代理对象
const validateProxies = ProxyFactory(validateElements);
console.log(validateProxies);//Proxy(NodeList) {0: input, 1: input}
// 遍历validateProxies
validateProxies.forEach((proxyTarget, index) => {
    proxyTarget.addEventListener("blur", function(){
    try{
        // 设置代理对象的属性值
        validateProxies[index] = this;
    }
    catch(e){
        console.error(e.message);
    }
    });
});
