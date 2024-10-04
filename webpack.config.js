// 引入path模块
const path = require('path');
module.exports = {
    // 模式
    mode: 'development',// 或者用 production
    // 入口文件
    entry: './principle/index.js',
    output: {
        // 打包到当前目录下的dist文件夹下
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件名
        filename: 'Kenson-utils.js',
        // 向外暴露的对象名
        library: 'kutils',
        // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
        libraryTarget: 'umd'
    }
};