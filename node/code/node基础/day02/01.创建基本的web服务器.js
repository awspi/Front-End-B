const http =require('http');
const server = http.createServer();
server.on('request',function(req,res){
  console.log(req,res);})
server.listen(8080,function(){ //默认80 可以省略
  console.log('Runing on 8080');
})