/**
* @description 数字工具类
* @author chenkuncheng
* @date 2024-08-10 14:57:25
* @lastEditTime 2024-08-1014:57:25
* @lastEditors chenkuncheng
* @filePath module\NumberHelper.js
*/
// 具名导出NumberHelper类
export class NumberHelper {
  /**
  * @description 判断一个数是否是偶数
  * @param num 要判断的数
  * @return void
  * @status public
  */
  static isEven(num) {
    return num % 2 === 0;
  }

  /**
  * @description 四舍五入保留decimal位小数
  * @param num 要处理的数
  * @param decimal 保留的小数位数
  * @return void
  * @status public
  */
  static roundDecimal(num, decimal = 2) {
    return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  /**
  * @description 判断两个数是否相等, 默认精度为0.01
  * @param a 数字1
  * @return void
  * @status public
  */
  static isEquals(a, b, error = 0.01) {
    return Math.abs(a - b) < error;
  }
}

// 默认导出AgeNumber
export default class AgeNumber {
  static MIN = 0;
}