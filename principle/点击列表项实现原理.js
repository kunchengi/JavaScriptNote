    // 错误示范
    let items = document.getElementsByClassName("item");
    for(var i=0;i<items.length;i++){
        items[i].onclick = function () {
            console.log(i);// i=3
            items[i].style.background= "pink";// 报错
        }
    }

    // 使用let声明变量解决
    let items1 = document.getElementsByClassName("item1");
    //遍历并绑定事件
    for(let i=0;i<items1.length;i++){
        items1[i].onclick = function () {
            //修改当前元素的背景颜色
            //如果用ver声明i变量，只能用this
            // this.style.background= "pink";
            //如果用let声明i变量，可以之间用items[i]，因为let声明的变量在各个代码块之间是互不影响的
            items1[i].style.background= "pink";
        }
    }

    // 先获取元素，再绑定事件
    let items2 = document.getElementsByClassName("item2");
    for(var i=0;i<items2.length;i++){
        let item = items2[i];
        item.onclick = function () {
            item.style.background= "pink";
        }
    }

    // 事件委托解决
    let container = document.getElementsByClassName("container")[3];
    container.onclick = function (e) {
        let target = e.target;
        if(target.className === "item3"){
            target.style.background= "pink";
        }
    }

    // 闭包解决
    let items4 = document.getElementsByClassName("item4");
    for(var i=0;i<items4.length;i++){
        items4[i].onclick = (function (i) {
            return function () {
                items4[i].style.background= "pink";
            }
        })(i);
    }

    // 使用this解决
    let items5 = document.getElementsByClassName("item5");
    for(var i=0;i<items5.length;i++){
        items5[i].onclick = function () {
            this.style.background= "pink";
        }
    }