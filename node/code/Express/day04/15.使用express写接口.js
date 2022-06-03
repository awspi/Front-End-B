const express=require('express')
const app=express();
const router =require('./16.apiRouter')

//如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))

app.use('/api',router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
