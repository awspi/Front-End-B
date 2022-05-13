$(function() {
    load();
    $('#title').on('keyup', function(e){
        if(e.keyCode ===13){
            if($(this).val()!=''){
                let data=getData();
                let tmp={'title':$(this).val(),'done':false}
                data.push(tmp);
                save(data);
                load();
            }else{alert('Please enter')}
            $(this).val('')
        }
    })
    function getData(){
        let data =localStorage.getItem('todoList');
        if(data!=null){
            return JSON.parse(data);
        }else{ return [];}

    }

    function save(data){
        localStorage.setItem('todoList',JSON.stringify(data));
    }
    function load(){
        let todocount=0;
        let donecount=0;
      let data=getData();
      $('ol,ul').empty();
      $.each(data,function(i,ele){
        let row=$('<li><input type="checkbox"><p>'+ele.title+'</p></input></input> <a href="javascript:" index='+i+'></a></li>');
          if(ele.done){
            donecount++
            row.find('input').prop('checked','checked')
            $('#donelist').prepend(row);
          }else{
            todocount++;
            $('#todolist').prepend(row);
          }
      })
      $('#donecount').text(donecount);
      $('#todocount').text(todocount);
    }
    
    //del
    $('ol,ul').on('click','a', function(){
        let data=getData();
        let index=$(this).attr('index');
        data.splice(index,1);
        save(data);
        load();
    })
    //toggle
    $('ul,ol').on('click','input', function(){
        let data=getData();
        let index=$(this).siblings('a').attr('index');
        data[index].done=$(this).prop('checked');
        save(data);
        load();
    })


})