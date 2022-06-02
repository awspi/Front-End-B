const fs = require('fs');
const path = require('path');

// 定义正则表达式
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

// readFile
fs.readFile(path.join(__dirname,'/index.html'),'utf-8',function(err,dataStr){
  if(err){
    return console.log(err)
  }
  //读取文件成功后，调用对应的三个方法，分别拆解出 css, js, html 文件
  resolveCSS(dataStr)
  resolveJS(dataStr)
  resolveHTML(dataStr)
})

function resolveCSS(htmlStr){
    const r1 = regStyle.exec(htmlStr);
    const newCSS = r1[0].replace('<style>','').replace('</style>','')
    fs.writeFile(path.join(__dirname,'/index.css'),newCSS,function(err){
      if(err){
        return console.log(err)
      }
      console.log('CSS Done');
    });
}

function resolveJS(htmlStr){
  const r2 = regScript.exec(htmlStr);
  const newJS = r2[0].replace('<script>','').replace('</script>','')
  fs.writeFile(path.join(__dirname,'/index.js'),newJS,function(err){
    if(err){
      return console.log(err)
    }
    console.log('JS Done');
  });
}

function resolveHTML(htmlStr){
  // 将字符串调用 replace 方法，把内嵌的 style 和 script 标签，替换为外联的 link 和 script 标签
  const newHTML = htmlStr.replace(regStyle,'<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')//replace支持正则
  fs.writeFile(path.join(__dirname,'/index.html'),newHTML,function(err){
    if(err){
      return console.log(err);
    }
    console.log('HTML Done');
  })
}