// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: '12345678', // 登录数据库的密码
  database: 'my_db_01', // 指定要操作哪个数据库
})

// 测试 mysql 模块能否正常工作
db.query('select * from users', (err, results) => {
  // mysql 模块工作期间报错了
  if(err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
})