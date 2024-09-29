// 导入具名导出的模块
import { pointHelper } from "../module/PointHelper.js";
// 只会解析（执行）一次相同导入的内容
// import { pointHelper } from "../module/PointHelper.js";
// 导入默认导出的模块
import Point from "../module/data/Point.js";
// 默认导出的模块可以自定义别名，比如以下代码，但最好不要自定义
// import P from "../module/data/Point.js";
// 导入模块并设置别名
// import { NumberHelper as NumberUtil } from "../module/NumberHelper.js";
// 混合导入默认导出和具名导出的模块
import AgeNumber, { NumberHelper as NumberUtil } from "../module/NumberHelper.js";
// 批量导入模块，别名为enums
import * as enums from "../module/data/DataEnum.js";
// 模块会默认使用严格模式
// a = 1;// 报错，a is not defined
const point1 = new Point(1, 2);
const point2 = new Point(1, 2);
const point3 = new Point(2, 2);
console.log(pointHelper.isEquals(point1, point2));// true
console.log(pointHelper.isEquals(point1, point3));// false
console.log(NumberUtil.isEven(2));// true
console.log(AgeNumber.MIN);// 0
console.log(enums.weekEnum.MONDAY);// 1
console.log(enums.monthEnum.JANUARY);// 0
// 按需加载模块
if (enums.weekEnum.MONDAY === 1) {
    // 返回一个Promise对象
    const linePromise = import("../module/data/Line.js");
    // 当模块加载完成后执行then方法
    linePromise.then(module => {
        const Line = module.Line;
        console.log(new Line());// Line {start: Point, end: Point}
    });
}
// 模块化最好结合打包工具使用，比如webpack、rollup等，本教程暂不赘述，请学习相关打包工具