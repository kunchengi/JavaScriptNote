# 打包代码，并制作成npm包

1. 生成`package.json`文件
   ```shell
   npm init -y
   ```
2. 安装webpack相关依赖包
   ```shell
   cnpm i webpack webpack-cli
   ```
3. 配置webpack.config.js
4. 创建入口文件index.js
5. 在package.json中的scripts中添加打包命令
   ```json
   "build:watch": "webpack --watch"
   ```
6. 执行打包命令
   ```shell
   npm run build:watch
   ```
7. 将要导出的方法、类、变量都使用export关键字导出
8. 在index.js中引入模块
9. 在index.js中导出模块
10. 在package.json中修改：
    ```json
    "name": "kenson-utils" // 必须在npm平台上独一无二
    "main": "./dist/Kenson-utils.js" // 打包后的文件
    "keywords": ["JavaScript", "utils", "axios"] // 平台搜索的关键字
    ```
11. npm配置，不能用淘宝镜像
    * 发布前必须执行：
      ```shell
      npm config set registry https://registry.npmjs.org
      ```
12. 注册npm账号
    * 打开官网：https://www.npmjs.com/
    * 点击：sign up
13. 发布npm包
    ```shell
    npm login
    npm publish
    ```
14. 设置回淘宝镜像
    ```shell
    npm config set registry https://registry.npmmirror.com
    ```
15. 使用npm包
    ```shell
    cnpm i kenson-utils
    ```
    ```javascript
    import { add } from 'kenson-utils'
    console.log(add(1, 2)) // 3
    ```
16. 更新npm包
    * 在package.json中修改版本号
    ```json
    "version": "1.0.1"
    ```
    * 执行打包命令并发布
    ```shell
    npm run build:watch
    npm publish
    ```
17. 将当前下载的npm包升级到最新版本
    ```shell
    npm update kenson-utils
    ```
18. 强制删除已发布的库（必须在发布后的72小时内删除）
    ```shell
    npm unpublish --force
    ```