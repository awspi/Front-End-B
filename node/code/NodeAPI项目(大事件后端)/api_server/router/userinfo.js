const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')

const { update_userinfo_schema,update_password_schema ,update_avatar_schema} = require('../schema/user')

router.get('/userinfo',userinfo_handler.getUserInfo)
// 更新用户信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
// 更新用户密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router