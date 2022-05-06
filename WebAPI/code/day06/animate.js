
function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){

        let step=(target-obj.offsetLeft)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        console.log("offset",obj.offsetLeft);
        console.log("step",step);
        obj.style.left=obj.offsetLeft+step+"px";
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
            callback && callback();
        }
    },15)

}