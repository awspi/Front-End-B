// 导入数据库操作模块
const db = require('../db/index')
const bcrypt=require('bcryptjs')


exports.getUserInfo=(req,res)=>{
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
// 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql,req.user.id,(err,results)=>{
  if (err) return res.cc(err)
  if(results.length!==1) return res.cc('获取用户信息失败')
  res.send({
    status:0,
    messgae:'获取用户基本信息成功!',
    data:results[0]
  })
})
}
//更新用户信息
exports.updateUserInfo=(req,res)=>{
  const sql = `update ev_users set ? where id=?`
  db.query(sql,[req.body,req.body.id],(err,results)=>{//req.body: id nickname email
    if (err) return res.cc(err)
    if(results.affectedRows!==1) return res.cc('更新用户信息失败')
    return res.cc('修改用户基本信息成功!',0)
  })

}
//更新密码
exports.updatePassword=(req,res)=>{
  // 执行 SQL 语句查询用户是否存在
  const sql = `select * from ev_users where id=?`
  db.query(sql,req.user.id,(err,results)=>{
    if (err) return res.cc(err)
    if(results.length!==1)  res.cc('用户不存在')
    //验证旧密码
    const compareRes=bcrypt.compareSync(req.body.oldPwd,results[0].password)
    if (!compareRes) return res.cc('原密码错误！')
    //更新密码
    const sql = `update ev_users set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10) //对新密码进行 bcrypt 加密处理
    db.query(sql,[newPwd,req.user.id],(err,results)=>{
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')
      //成功
      res.cc('更新密码成功！', 0)
    })
  })


}


//updateAvatar
exports.updateAvatar=(req,res)=>{
  const sql = 'update ev_users set user_pic=? where id=?'
  db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
  if (err) return res.cc(err)
  if (results.affectedRows !== 1) return res.cc('更新头像失败！')
  return res.cc('更新头像成功！', 0)
  })
}