const fs = require('fs')

fs.readFile('node基础/day01/files/成绩.txt', 'utf8', function(err, dataStr) {
  if (err) {
    return console.log('读取文件失败！' + err.message)
  }

  const arrOld = dataStr.split(' ')  // 先把成绩的数据，按照空格进行分割
  //循环分割后的数组，对每一项数据，进行字符串的替换操作
  const arrNew = []
  arrOld.forEach(item => {
    arrNew.push(item.replace('=', '：'))
  })
  //把新数组中的每一项，进行合并，得到一个新的字符串
  const newStr = arrNew.join('\n')

  // 5. 调用 fs.writeFile() 方法，把处理完毕的成绩，写入到新文件中
  fs.writeFile('node基础/day01/files/成绩-ok.txt', newStr, function(err) {
    if (err) {
      return console.log('写入文件失败！' + err.message)
    }
    console.log('成绩写入成功！')
  })
})
