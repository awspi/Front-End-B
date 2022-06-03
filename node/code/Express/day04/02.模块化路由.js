const express = require('express')
const app = express()
// 1. 导入路由模块
const router = require('./03.router')
// 2. 注册路由模块
// 2.使用app.use() 注册路由模块，并添加统的访问前缀/api
app.use('/api', router)

// 注意： app.use() 函数的作用，就是来注册全局中间件

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
