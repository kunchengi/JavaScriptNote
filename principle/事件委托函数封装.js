function addEventListener(element,type,fn, selector){
    // 如果element是字符串，获取对应的元素
    element = typeof element === "string" ? document.querySelector(element) : element;
    // 如果没传递选择器，则直接绑定事件
    if(!selector){
        element.addEventListener(type,fn);
    }else{// 有则使用事件委托
        element.addEventListener(type,function(e){
            // 获取触发事件的元素, 兼容性处理, IE8以下不支持e.target
            let target = e.target || e.srcElement;
            // 循环判断，如果target是选择器对应的元素，则执行fn
            while(target){
                // 判断元素是否匹配选择器
                if(target.matches(selector)){
                    fn.call(target,e);
                    return;
               }
            }
        })
    }
}

addEventListener("#list", "click", function(e){
    console.log(e.target.innerHTML);
},"li");
