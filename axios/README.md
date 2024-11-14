# axios入门与源码
1. 使用json-server模拟数据
    ```shell
    cnpm i json-server -g
    ```
2. 创建json-server文件夹
3. 在json-server文件夹中创建db.json文件，模拟数据
    ```json
    {
        "posts": [
            {
                "id": 1,
                "title": "json-server",
                "author": "typicode"
            }
        ],
        "comments": [
            {
                "id": 1,
                "body": "some comment",
                "postId": 1
            }
        ],
        "profile": {
            "name": "typicode"
        }
    }
    ```
4. 在json-server文件夹中启动服务
    * --watch监听文件变化
    ```shell
    json-server --watch db.json
    ```
    * --port指定端口号
    ```shell
    json-server --watch db.json --port 3001
    ```
    * -d指定延迟时间
    ```shell
    json-server --watch db.json -d 2000
    ```
    * --host指定主机名
    ```shell
    json-server --watch db.json --host 127.0.0.1
    ```
5. json-server使用说明
    * GET /posts 获取所有文章
    * GET /posts?id=1 获取id为1的文章
    * POST /posts 添加文章
    * PUT /posts/1 修改id为1的文章
    * DELETE /posts/1 删除id为1的文章
6. 引入axios
    ```html
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.7.2/axios.min.js"></script>
    ```
