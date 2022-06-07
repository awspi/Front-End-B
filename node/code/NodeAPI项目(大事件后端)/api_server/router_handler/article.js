// 导入数据库操作模块
const db = require('../db/index')
const path=require('path')

exports.addArticle=(req,res)=>{
  // console.log(req.body) // 文本类型的数据
  // console.log('--------分割线----------')
  // console.log(req.file) // 文件类型的数据
  // [Object: null prototype] {
  //   title: 'asd',
  //   cate_id: 1,
  //   state: '已发布',
  //   content: '123'
  // }
  // --------分割线----------
  // {
  //   fieldname: 'cover_img',
  //   originalname: '1.webp',
  //   encoding: '7bit',
  //   mimetype: 'image/webp',
  //   destination: '/Users/wsp/Documents/Front-End-b/Front-End-b/node/code/NodeAPI项目(大事件后端)/api_server/uploads',
  //   filename: 'eb939f64f888782b4f9ae7178d3662bf',
  //   path: '/Users/wsp/Documents/Front-End-b/Front-End-b/node/code/NodeAPI项目(大事件后端)/api_server/uploads/eb939f64f888782b4f9ae7178d3662bf',
  //   size: 18252
  // }
  //
  // 手动判断是否上传了文章封面 校验req.file
  if(!req.file||req.file.fieldname!='cover_img') return res.cc('文章封面是必选参数！')

  const articleInfo={
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img:path.join('/uploads',req.file.filename),
    pub_date:new Date(),
    author_id: req.user.id
  }
  const sql = `insert into ev_articles set ?`
  db.query(sql,articleInfo,(err,results)=>{
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布文章失败！')
    // 发布文章成功
    res.cc('发布文章成功', 0)
  })
}