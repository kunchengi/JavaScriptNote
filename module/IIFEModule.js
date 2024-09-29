let module = (function() {
    const moduleList = {};
    /**
    * @description 定义模块
    * @param name 模块名
    * @param modules 依赖模块
    * @param action 模块的具体实现
    * @return void
    * @status public
    */
    function define(name, modules, action) {
        // 获取依赖模块
        modules = modules.map((moduleName) => moduleList[moduleName]);
        // 保存模块到modules对象中
        moduleList[name] = action.apply(null, modules);
    }
    return { define };
})();
// 定义数组工具模块
module.define("numberHelper", [], function() {
    return {
        // 四舍五入保留decimal位小数
        roundDecimal: function(num, decimal = 2) {
            return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
        },
        // 判断两个数是否相等, 默认精度为0.01
        isEquals: function(a, b, error = 0.01) {
            return Math.abs(a - b) < error;
        }
    };
});
// pointHelper模块依赖numberHelper模块
module.define("pointHelper", ["numberHelper"], function(numberHelper) {
    return {
        isEquals: function(point1, point2) {
            return numberHelper.isEquals(point1.x, point2.x) && numberHelper.isEquals(point1.y, point2.y);
        }
    };
});