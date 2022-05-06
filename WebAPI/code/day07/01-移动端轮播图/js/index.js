window.addEventListener('load', function() {

    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let w = focus.offsetWidth;
    let ol = focus.children[1];
    let index=0;
    let timer=setInterval(function() {
        index++;
        let translateX=-index*w;
        ul.style.transition='all .3s'
        ul.style.transform = 'translateX('+translateX+'px)';

    },2000)
    ul.addEventListener('transitionend', function() {
        if(index>=3){
            index=0;
            ul.style.transition='none';
            let translateX=-index*w;
            ul.style.transform = 'translateX('+translateX+'px)';
        }
        if(index<0){
            index=2;
            ul.style.transition='none';
            let translateX=-index*w;
            ul.style.transform = 'translateX('+translateX+'px)';
        }
    ///////
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    /////////////////////////
    let startX=0;
    let moveX=0;
    let flag=false;
    ul.addEventListener('touchstart', function(){
        startX=e.targetTouches[0].pageX;
        clearInterval(timer);
    })    
    ul.addEventListener('touchmove', function(e){
        moveX=e.targetTouches[0].pageX-startX;
        let translateX=-index*w+moveX;
        ul.style.transform = 'translateX('+translateX+'px)';
        flag=true;
        e.preventDefault();
    })
    ul.addEventListener('touchend', function(){
        if(flag){
            if(Math.abs(moveX)>50){
                if(moveX>0){//上一张
                    index--;
                }else{
                    index++;
                }
                let translateX=-index*w+moveX;
                ul.style.transition='all .3s'
                ul.style.transform = 'translateX('+translateX+'px)';
            }else{
                let translateX=-index*w;
                ul.style.transition='all .2s'
                ul.style.transform = 'translateX('+translateX+'px)';
            }
    

        }
        clearInterval(timer);
        timer=setInterval(function() {
            index++;
            let translateX=-index*w;
            ul.style.transition='all .3s'
            ul.style.transform = 'translateX('+translateX+'px)';
    
        },2000)
    })

    ////////////////////////////////
    let goback=document.querySelector('.goBack');
    let nav=document.querySelector('nav');
    window.addEventListener('scroll', function(){
        if(window.pageYOffset>=nav.offsetTop){
            goback.style.display='block';
        }else{
            goback.style.display='none';
        }
        
    })
    goback.addEventListener('click', function(){
        window.scroll(0,0);
    })



})