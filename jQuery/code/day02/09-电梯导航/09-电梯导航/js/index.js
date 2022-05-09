$(function() {
    let flag1=0;
    let flag2=1;
    toggleTool();
    function toggleTool(){
        if($(document).scrollTop()>=$('.recommend').offset().top) {
            if(flag1==0){
                $('.fixedtool').fadeIn();
                flag1=1;
            }
        }else{
            if(flag1==1){
                $('.fixedtool').fadeOut();
                flag1=0;
                console.log(0);
            }
        }
    }
    $(window).scroll(function() {
        toggleTool();
        ////////////////
        if(flag2==1){
            $('.floor .w').each(function(index,ele){
                if($(document).scrollTop()>=$(ele).offset().top){
                    console.log(index);
                    $('.fixedtool li').eq(index).addClass('current').siblings().removeClass('current');
                }
            })
        }


    })
    //////////////////
    $('.fixedtool li').click(function() {
        flag2=0;
        let cur=$('.floor .w').eq($(this).index()).offset().top;
        // $('body,html').scrollTop(cur);
        $('html,body').stop().animate({
            scrollTop:cur
        },function(){
            flag2=1;
        })
        //////////////////
        $(this).addClass('current').siblings().removeClass('current');
    })
    

})