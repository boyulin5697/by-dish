# by-dish

**一个微信小程序免登录点餐系统**

### 模块介绍

* by-dish-bms 后台管理系统，基于React+Ant Design+Procompoent+Apollo GraphQL

* ByDishBackend 项目后端，基于Go+Gin+gorm+MySQL+GraphQL，项目配置管理基于Nacos服务注册/配置中心

* by-dish-cust 项目前端，基于taro+GraphQL

### 项目启动方式

* 后端基于 go 1.20版本，启动命令为：

```shell
    go build ByDishBackend
```

* bms前端基于React 18.2.0, 基本启动项目命令为:
```shell
    npm install //安装依赖
    npm run start //启动
```

* cust前端：

```shell
    npm install
    npm run dev:h5 //h5方式呈现
```

### 注意事项

1. 后端可以通过访问 地址：端口/gql/playground方式启动GraphQL交互式api请求平台。
2. 如果想对GraphQL接口及其出入参进行改造，或有新增接口等行为，可以按这样的步骤操作：
   
* 打开ByDishBackend/graph/schema.graphql，调整内容，然后复制schema.resolvers.go中所有接口的实现代码，
然后执行graphql.sh文件：
```shell
    ./graphql.sh //在linux/MacOS系统下
```

（如果是windows，那就按照里面的命令自行改造吧）

接下来，在新生成的schema.resolvers.go里粘贴这些方法代码即可。

3. （如果这个项目真被其他人看到的话）有问题的话欢迎提Issues

*最重要的事：* 本人能力有限，go、Vue、React等技术也刚接触未久，项目粗陋，有很多混乱或不符合常规开发模式的地方请见谅，

4. 成品图

![菜单成品](https://seckill-1305486145.cos.ap-guangzhou.myqcloud.com/4c96bcea5a2a43deac521d693c58a55b.jpg)

![后台管理页面成品](https://seckill-1305486145.cos.ap-guangzhou.myqcloud.com/5968b3626bd04d6ab0362cf040d1ea59.png)

5. 支持功能

(1) 与nacos注册中心对接，提供可配置化的数据源。
(2) 支持自由添加菜品和菜品配置（即自由选择是否控制甜度、咸度等等）
(3) 支持下单后自动推送邮件通知


6. 其他
如需SQL脚本，可以提issue告诉我联系方式
