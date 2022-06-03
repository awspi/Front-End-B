const pithy = require('./pithy-tools')

// 格式化时间的功能
const dtStr = pithy.dateFormat(new Date())
console.log(dtStr)
console.log('-----------')

const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
const str = pithy.htmlEscape(htmlStr)
console.log(str)
console.log('-----------')

const str2 = pithy.htmlUnEscape(str)
console.log(str2)
