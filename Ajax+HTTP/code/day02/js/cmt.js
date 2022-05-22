let url='http://www.liulongbin.top:3006';
getCommentList();
function getCommentList(){
  $.get(url+'/api/cmtlist',function(res){
    if(res.status !== 200){
      alert('Error')
      return;
    }
    let data=res.data
    let rows=[]
    $.each(data,function(index,item){
      rows.push(`
      <li class="list-group-item">
        <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
        <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
        ${item.content}
      </li>`);
      $('#cmt-list').empty().append(...rows)


    })

    console.log();
  })
}

$(function() {
  $('#formAddCmt').submit(function(e) {
    e.preventDefault();
    let data=$(this).serialize();

    console.log(data);
    $.post(url+'/api/addcmt',data,function(res){
      console.log(res);
      if(res.status!==201){
        alert('error')
        return;
      }
      getCommentList();
      $('#formAddCmt')[0].reset();
    })
  })
})