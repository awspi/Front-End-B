$(function() {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  // 为发送按钮绑定鼠标点击事件
  $('#btnSend').on('click', function() {
    let text = $('#ipt')
      .val()
      .trim()
    if (text.length <= 0) {
      return $('#ipt').val('')
    }
    $('#talk_list').append(`<li class="right_word"><img src="img/person02.png" /> <span>${text}</span></li>`)
    $('#ipt').val('')
    getMsg(text);
    resetui();
  })

  // 获取聊天机器人发送回来的消息
  function getMsg(text) {
    $.get('http://www.liulongbin.top:3006/api/robot',{spoken:text},function(res){
      if(res.message === 'success') {
        let msg = res.data.info.text;
        $('#talk_list').append(`<li class="left_word"><img src="img/person01.png" /> <span>${msg}</span></li>`)
        getVoice(msg);
      }
    })
  }

  // 把文字转化为语音进行播放
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url:'http://www.liulongbin.top:3006/api/synthesize',
      data:{
        text:text
      },
      success: function(res) {
        console.log(res);
        if(res.status==200){
          $('#voice').attr('src',res.voiceUrl);
        }
      }
    })
  }

  // 为文本框绑定 keyup 事件
  $('#ipt').on('keyup', function(e) {
    if(e.keyCode==13){
      $('#btnSend').click();
    }
  })
})
