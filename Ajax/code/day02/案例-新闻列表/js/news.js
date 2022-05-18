let url='http://www.liulongbin.top:3006';
$(function () {
  //
  function padZero(n){
    if(n<10){
      return '0'+n;
    }else{
      return n;
    }
  }
  //
  template.defaults.imports.dateFormat=function (dStr){
    let date=new Date(dStr);
    let y=date.getFullYear();
    let m=padZero(date.getMonth());
    let d=padZero(date.getDate());
    let hh=padZero(date.getHours());
    let mm=padZero(date.getMinutes());
    let ss=padZero(date.getSeconds());
    return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss;
  }
  //
  function getNewsList() {
    $.get(url+'/api/news',function(res){
      if(res.status!=200){
        return alert('Error');
      }
      res.data.forEach(function(item,index){
        item.tags=item.tags.split(',');
      })
      let htmlStr=template('tpl-news',res);
      $('#news-list').html(htmlStr);
      console.log(res);
    })
  }
  getNewsList();
})
