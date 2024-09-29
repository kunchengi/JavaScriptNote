/**
* @description Point类，表示一个点
* @author chenkuncheng
* @date 2024-08-10 15:13:27
* @lastEditTime 2024-08-1015:13:27
* @lastEditors chenkuncheng
* @filePath module\data\Point.js
*/
// 默认导出Point类，默认导出在一个模块中只能有一个
export default class Point {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
    * @description 重写toString方法
    * @param 
    * @return void
    * @status public
    */
    toString() {
        return `(${this.x},${this.y})`;
    }
}
// 也可以起别名default，为默认导出
// export {Point as default};