let url='http://www.liulongbin.top:3006';
function getCommentList(){
  $.get(url+'/api/cmtlist',function(res){
    if(res.status !== 200){
      alert('Error')
      return;
    }
    console.log(res);
    let data=res.data
    let id=data.id;
    let username=data.username;
    let content=data.content;
    let time=data.time;
    
  })
}
getCommentList();