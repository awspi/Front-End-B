function resolveData(data){
  let arr=[];
  for(let key in data){
    let str=key+'='+data[key];
    arr.push(str);
  }
  return arr.join('&');
};
function myAjax(options){
  let xhr=new XMLHttpRequest();
  let data=resolveData(options.data);
  if(options.method.toUpperCase()=='GET'){
    xhr.open(options.method,options.url+"?"+data);
    xhr.send();
  }else{
    xhr.open(options.method,options.url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(data);
    }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      let res=JSON.parse(xhr.responseText);
      //转为对象
      options.success(res);
    }
  }
}