/**
 * 打包代码，并制作成npm包:
 * 1. 生成package.json文件
 *      npm init -y
 * 2. 安装webpack相关依赖包
 *      cnpm i webpack webpack-cli
 * 3. 配置webpack.config.js
 * 4. 创建入口文件index.js
 * 5. 在package.json中的scripts中添加打包命令
 *      "build:watch": "webpack --watch"
 * 6. 执行打包命令 npm run build:watch
 * 7. 将要导出的方法、类、变量都使用export关键字导出
 * 8. 在index.js中引入模块
 * 9. 在index.js中导出模块
 * 10. 在package.json中修改：
 *      "name": "kenson-utils"// 必须在npm平台上独一无二
 *      "main": "./dist/Kenson-utils.js" // 打包后的文件
 *      "keywords": ["JavaScript", "utils", "axios"] // 平台搜索的关键字
 * 11. npm配置，不能用淘宝镜像
 *      发布前必须执行：npm config set registry https://registry.npmjs.org
 *      发布完后再修改回：npm config set registry https://registry.npmmirror.com
 * 12. 注册npm账号
 *      https://www.npmjs.com/
 *      sign up
 * 13. 发布npm包
 *      npm login
 *      npm publish
 * 14. 使用npm包4
 *      cnpm i kenson-utils
 *      import {add} from 'kenson-utils';
 *      add(1, 2);
 * 15. 更新
 *      在package.json中修改版本号
 *      npm publish
 * 16. 将当前下载的npm包升级到最新版本
 *      npm update kenson-utils
 * 17. 强制删除已发布的库（必须在发布后的72小时内删除）
 *      npm unpublish --force
 */
export function add(a, b) {
    console.log('add');
    return a + b;
}

export {newInstance} from '../principle/创建对象实例';
export {reverseString} from '../principle/翻转字符串';
export {throttle, debounce} from '../principle/函数节流和防抖';
export {palindrome} from '../principle/检测回文字符串';
export {truncate} from '../principle/截取字符串';
export {clone} from '../principle/浅拷贝';
export {pull, drop, dropRight} from '../principle/删除数组元素';
export {axios} from '../principle/axios';