const express =require('express');
const router =express.Router();
router.get('/user/list',(req,res)=>{
  res.send('list');
})
router.post('/user/add',(req,res)=>{
  res.send('add');
})
module.exports=router