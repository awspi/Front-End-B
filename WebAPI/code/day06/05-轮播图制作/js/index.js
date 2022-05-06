window.addEventListener('load',()=>{
    let arrow_l=document.querySelector('.arrow-l');
    let arrow_r=document.querySelector('.arrow-r');
    let focus=document.querySelector('.focus');
    let focusWidth=focus.offsetWidth;
    let ul=focus.querySelector('ul');
    let circle=document.querySelector('.circle');

    for(i=0;i<ul.children.length;i++){
        let li=document.createElement('li')
        li.setAttribute('index',i);
        circle.appendChild(li);
        li.addEventListener('click',function(){
            for(let i=0;i<ul.children.length;i++){
                circle.children[i].className='';
            }
            this.className='current';
            //left= 索引号*宽度
            let index=this.getAttribute('index');
            num=index;
            cirLen=num;
            animate(ul,-index*focusWidth);
        })
        
    }
    circle.children[0].className='current';
    //btn
    focus.addEventListener('mouseenter',()=>{
        arrow_l.style.display="block";
        arrow_r.style.display="block";
        clearInterval(timer);
        timer=null;
    })
    focus.addEventListener('mouseleave',()=>{
        arrow_l.style.display="none";
        arrow_r.style.display="none";

        timer=setInterval(function(){
            arrow_r.click();
        },3000)
    })

    //移动ul
    let num=0;
    let cirLen=0;
    let flag=true;

    arrow_r.addEventListener('click',()=>{
        if(flag){
            flag=false;
            if(num==ul.children.length-1){
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*focusWidth,()=>{
                flag=true;
            });
            cirLen++;
            if(cirLen==circle.children.length){
                cirLen=0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener('click',()=>{
        if(num==0){
            num=ul.children.length-1;
            ul.style.left=-num*focusWidth+"px";
        }
        num--;
        animate(ul,-num*focusWidth);
        cirLen--;
        cirLen=cirLen<0?cirLen=circle.children.length-1:cirLen;

        circleChange();
    })
    function circleChange(){
        for(let i=0;i<circle.children.length;i++){
            circle.children[i].className='';
        }
        circle.children[cirLen].className='current';
    }
    
    let timer=setInterval(function(){
        arrow_r.click();
    },3000)
})