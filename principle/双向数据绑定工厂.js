function ProxyFactory(target, validate){
    return new Proxy(target, {
        get(obj, key){
            return obj[key];
        },
        set(obj, key, value){
            validate.execute(value);
            obj[key] = value;
            return true;
        }
    });
}

function bindEvent(eventName, validate){
    const elements = document.querySelectorAll(`[${eventName}]`);
    elements.forEach(element => {
        // 创建代理对象
        let proxy = ProxyFactory(element, validate);
        // 绑定失焦事件
        element.addEventListener("blur", function(){
            try{
                // 设置代理对象的属性值
                proxy[eventName] = this;
            }
            catch(e){
                console.error(e.message);
            }
        });
    });
}

class Rule{
    max(value, max){
        return Number(value) <= Number(max);
    }
    min(value, min){
        return Number(value) >= Number(min);
    }
    isNumber(value){
        return /^\d+$/.test(value);
    }
    execute(element){
        let ruleStr = element.getAttribute("rule");
        let eleValue = element.value;
        if(ruleStr && eleValue)
        {
            let rules = ruleStr.split(",");
            rules.forEach(rule => {
                let [ruleName, ruleValue] = rule.split(":");
                if(!this[ruleName](eleValue, ruleValue)){
                    throw new Error(`输入的值不符合${ruleName}：${ruleValue || ""}的规则`);
                }
            });
        }
    }
}
const rule = new Rule();
bindEvent("rule", rule);

class VModel{
    execute(element){
        let key = element.getAttribute("v-model");
        let eleValue = element.value;
        // 获取所有包含v-model属性且属性值为key的元素
        let modelElements = document.querySelectorAll(`[v-model=${key}]`);
        // 遍历所有包含v-model属性且属性值为key的元素
        modelElements.forEach(modelElement => {
            // 设置元素的值
            modelElement.innerHTML = eleValue;
        });
        // 获取所有包含v-bind属性且属性值为key的元素
        let bindElements = document.querySelectorAll(`[v-bind=${key}]`);
        // 遍历所有包含v-bind属性且属性值为key的元素
        bindElements.forEach(bindElement => {
            // 设置元素的属性值
            bindElement.innerHTML = `长度：${eleValue.length}`;
        });
    }
}
const vModel = new VModel();
bindEvent("v-model", vModel);