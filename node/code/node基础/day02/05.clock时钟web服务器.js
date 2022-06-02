const http=require('http');
const fs=require('fs');
const path= require('path');

const server= http.createServer();
server.on('request',(req,res)=>{
  const url = req.url;
  let fpath=''
  if(req.url=='/'){
    fpath=path.join(__dirname,'./clock/index.html')
  }else(
    fpath=path.join(__dirname,'./clock',url)
  )
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) return res.end('404')
    res.end(dataStr);
  })
})
server.listen(80,()=>{
  console.log('server running at 80 port');
})