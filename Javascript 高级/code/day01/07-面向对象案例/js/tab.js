let that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.lis=this.main.querySelectorAll('li');
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.sections = this.fsection.querySelectorAll('section');
        this.add=this.main.querySelector('.tabadd');
        this.ul=this.main.querySelector('.firstnav ul:first-child')
        this.remove=this.main.querySelectorAll('.icon-guanbi')
        this.init();
    }
    init() {
        this.updateNode();
            // init 初始化操作让相关的元素绑定事件
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick=this.removeTab;
                this.spans[i].ondblclick=this.editTab;
            }
            this.add.onclick=this.addTab;
        }
    toggleTab(){
        // console.log(this.index)
        that.clearClass()
        this.className='liactive';
        that.sections[this.index].className='conactive';
    }
    clearClass(){
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].className='';
            this.sections[i].className='';
        }
    }
    addTab(){
        that.clearClass()
        let rand=Math.random();
        let li='<li class="liactive"><span>new tab</span><span class="iconfont icon-guanbi"></span></li>';
        let section='<section class="conactive">'+rand+'</section>';
        that.ul.insertAdjacentHTML('beforeend',li)
        that.fsection.insertAdjacentHTML('beforeend',section)
        that.init();
    }
    removeTab(e){
        e.stopPropagation();
        let index=this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        if(document.querySelector('.liactive')) return;
        if(index!=0){
            that.lis[index-1].click();
        }else{that.lis[1].click();
        }
        that.init();
        
    }
    updateNode(){
        this.lis=this.main.querySelectorAll('li');
        this.sections = this.fsection.querySelectorAll('section');
        this.remove=this.main.querySelectorAll('.icon-guanbi');
        this.spans=this.main.querySelectorAll('.firstnav li span:first-child');
    }
    editTab(){
        window.getSelection ? window.getSelection().removeAllRanges() : 				    document.selection.empty();
        let str=this.innerHTML;
        this.innerHTML='<input type="text" >'
        let input=this.children[0];
        input.value=str;
        input.select();
        input.onblur=function() {
            this.parentNode.innerHTML=this.value;
        }
        input.onkeyup=function(e) {
            if(e.keyCode==13){
                this.parentNode.innerHTML=this.value;
            }
        }
    }
}
new Tab('#tab');