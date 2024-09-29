import { NumberHelper } from './NumberHelper.js';
export class pointHelper
{
    /**
    * @description 判断两个点是否相等, 精度为0.01
    * @param 
    * @return void
    * @status public
    */
    static isEquals(point1, point2) {
        return NumberHelper.isEquals(point1.x, point2.x) && NumberHelper.isEquals(point1.y, point2.y);
    }
}
// 导出pointHelper类并起别名为PountUtil
// export { pointHelper as PountUtil };