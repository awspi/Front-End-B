const express= require('express')
const router=express.Router()

// GET
router.get('/get',(req,res)=>{
  const query=req.query
  res.send({
    status:0,
    msg:'GET success',
    data:query
  })
})
// POST
router.post('/post',(req,res)=>{
  const body=req.body
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  res.send({
    status:0,
    msg:'POST success',
    data:body
  })
})
// del
router.delete('/delete',(req,res)=>{
  // res.setHeader('Access-Control-Allow-Method','DELETE')
  const body=req.body
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  res.send({
    status:0,
    msg:'DEL success',
    data:body
  })
})

module.exports=router