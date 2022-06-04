const express=require('express')
const app=express();
const router =require('./16.apiRouter')
const cors =require('cors')

//如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.get('/api/jsonp',(req,res)=>{
  console.log(req.query);
  const funcName=req.query.callback
  const data ={name:'pithy',age:20}
  const scriptStr=`${funcName}(${JSON.stringify(data)})`
  res.send(scriptStr)
})
app.use(cors())

app.use('/api',router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
