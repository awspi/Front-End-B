const express=require('express')
const router =express.Router()
const artcate_handler=require('../router_handler/artcate')
const expressjoi=require('@escook/express-joi')
const { add_cate_schema ,delete_cate_schema,get_cate_schema,update_cate_schema} =require('../schema/artcate')
// 获取全部文章分类的路由
router.get('/cates',artcate_handler.getArticleCates)
// 根据id获取文章分类的路由
router.get('/cates/:id',expressjoi(get_cate_schema),artcate_handler.getArticleById)
// 新增文章分类的路由
router.post('/addcates',expressjoi(add_cate_schema),artcate_handler.addArticleCates)
// 新增文章分类的路由
router.get('/deletecate/:id',expressjoi(delete_cate_schema),artcate_handler.deleteCateById)
// 新增文章分类的路由
router.post('/updatecate',expressjoi(update_cate_schema),artcate_handler.updateCateById)

module.exports=router