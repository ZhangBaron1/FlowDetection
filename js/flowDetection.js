$(function () {
    // 获取手指在轮播图元素上的一个滑动方向（左右）

    // 获取界面上轮播图容器
    var $carousels = $('.carousel');
    var startX,endX;
    // 在滑动的一定范围内，才切换图片
    var offset = 50;
    // 注册滑动事件
    $carousels.on('touchstart',function (e) {
        // 手指触摸开始时记录一下手指所在的坐标x
        startX = e.originalEvent.touches[0].clientX;

    });
    $carousels.on('touchmove',function (e) {
        // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
        endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend',function (e) {
        //console.log(endX);
        //结束触摸一瞬间记录手指最后所在坐标x的位置 endX
        //比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
        var distance = Math.abs(startX - endX);
        if (distance > offset){
            //说明有方向的变化
            //根据获得的方向 判断是上一张还是下一张出现
            $(this).carousel(startX >endX ? 'next':'prev');
        }
    })
});
//设备检测
function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}
function stopDefault( e )
{
    if ( e && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;
}
function changgeLi(aLi,index,aSrc,oImg,hasA) {
    var clientW = window.innerWidth;
    for(var i=0; i<aLi.length ; i++){
        aLi[i].index = i;
        aLi[i].onmouseover = function(e){
            if(hasA&&detectmob()&&(clientW>768)){
                stopDefault(e);
                this.getElementsByTagName('a')[0].href = "javascript:;";
                console.log(this.getElementsByTagName('a')[0].href);
            }
            aLi[index].classList.remove('active');
            this.classList.add('active');
            index = this.index;
            oImg.src = aSrc[this.index%aLi.length];
            return false;
        }
    }
}

/*function getStyle(obj,attr){
    return getComputedStyle(obj)?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
}*/
//   实验案例切换
(function () {
        var oexUl = document.getElementById('example-ul');
        var aLi = oexUl.getElementsByTagName('li');
        var oBox = document.getElementsByClassName('box')[0];
        var oImg = oBox.getElementsByTagName('img')[0];
        var index = 0;
        var aSrc = ['img/example/mbcase1.png','img/example/mbcase2.png','img/example/mbcase3.png','img/example/mbcase4.png'];
        changgeLi(aLi,index,aSrc,oImg,true);
    }
)();

//项目报价切换
(function () {
        var oexUl = document.getElementById('projectOffer-ul');
        var aLi = oexUl.getElementsByTagName('li');
        var oBox = document.getElementsByClassName('price')[0];
        var oImg = oBox.getElementsByTagName('img')[0];
        var index = 0;
        var aSrc = ['img/price/price1.png','img/price/price2.png','img/price/price3.png','img/price/price4.png'];
        changgeLi(aLi,index,aSrc,oImg,false);
    }
)();

//服务说明
(function(){
    var oUl = document.getElementsByClassName('service-main')[0];
    var aLi = oUl.getElementsByTagName('li');
    var index = 0;
    var clientW = window.innerWidth;
    function remove(obj){
        obj.classList.remove('active');
        if(clientW > 1200){
            obj.classList.add('col-lg-2');
            obj.classList.remove('col-lg-4');
        }else if(clientW > 992){
            obj.classList.add('col-md-2');
            obj.classList.remove('col-md-4');
        }else if(clientW > 768){
            obj.classList.add('col-sm-2');
            obj.classList.remove('col-sm-4');
        }
    }
    for(var i=0; i<aLi.length; i++){
        aLi[i].index = i;
        aLi[i].onmouseover = function(){
            var nowWidth = window.innerWidth;
            clientW = nowWidth;
            aLi[index].classList.remove('active');
            this.classList.add('active');
            if(clientW > 1200){
                this.classList.remove('col-lg-2');
                this.classList.add('col-lg-4');
            }else if(clientW > 992){
                this.classList.remove('col-md-2');
                this.classList.add('col-md-4');
            }else if(clientW > 768){
                this.classList.remove('col-sm-2');
                this.classList.add('col-sm-4');
            }
            index = this.index;
        }
        aLi[i].onmouseout = function(){
            remove(aLi[this.index]);
        }
    }
})();