// 这是包的入口文件

const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

console.log(date);
console.log(escape);
// 向外暴露需要的成员
module.exports = {
  ...date,
  ...escape
}
