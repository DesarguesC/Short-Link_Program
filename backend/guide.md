# Golang Service Template

Golang back-end service template. Using this template, you can get started with back-end projects quickly.  

|  Web Framework   |     ORM      |   Database Driver    | Configuration Manager |   Log Manager   |  API Documentation  |
|:----------------:|:------------:|:--------------------:|:---------------------:|:---------------:|:-------------------:|
| labstack/echo/v4 | gorm.io/gorm | gorm.io/driver/mysql |      spf13/viper      | sirupsen/logrus | swaggo/echo-swagger |

> forked from go-svc-tpl



## 使用

1. 该模板未建立 model 层，请自己设计表结构，然后完成 model 部分
   - 注意，若非使用 `automigrate` 而是手动建表，请附上相应 sql 文档
2. controller 部分请遵循 api 文档，暂时不用管 swagger 部分 

## Init

1. create `conf.yaml`
2. use `swag init` to create swagger docs
3. go build & run
