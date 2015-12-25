window.onload=function()
{
	var oList=document.getElementById("box");
	var aUl=oList.getElementsByTagName("ul");
	var oBtn=document.getElementsByTagName("input");
	var iCeils=oList.clientWidth/aUl[0].children[0].offsetWidth;
	var iRows=oList.clientHeight/aUl[0].children[0].offsetHeight;
	var aXy=[],
        iNow=0,
        that=null,
        on=true,
        iNowO=null,
        timer=null;

	$('.content div').eq(0).children().addClass('move');
    for(var i=0;i<oBtn.length;i++){
        oBtn[i].index=i;
        oBtn[i].onclick=function()
        {   
            if(!on) return;
            for(var i=0;i<oBtn.length;i++)
                
            {
                oBtn[i].className="";
            }
            this.className="active"
            that=this;
            leave(this);
       };       
    }
	for(var i=0;i<aUl.length;i++)
	{
		aUl[i].style.zIndex=aUl.length-i;
		aXy.push(setXy(aUl[i].children,iCeils,iRows));
	}

    function leave(obj)
    {
        if(obj.index==iNow){return}
        on=false;
        for(i=0;i<oBtn.length;i++)
        {
            aUl[i].style.left="800px"; 
        }
        aUl[iNow].style.left='0px';  
        aUl[iNow].style.zIndex='5';        
        aUl[obj.index].style.left='0px';
        iNowO=$('.content').children().eq(iNow).find('*');
        iNowO.removeClass('move');
        
        setTimeout(function(){
            iNowO.css({
                'transition':'3.6s',
                '-webkit-transform':'translateY(-500px)',
                'opacity':'0'
            })
        },16)

        toTab(aXy[iNow],iCeils-1,iRows-1,function(iNowO){               
            with(this.style)
            {
                WebkitTransition="1s background,.2s border,.3s .15s box-shadow,2s .3s -webkit-transform,2s .3s opacity"; 
                transition="1s background,.2s border,.3s .15s box-shadow,2s .3s transform,2s .3s opacity"; 
                borderColor="rgba(0,0,0,0.6)";
                boxShadow="0 0 20px blue";
                WebkitTransform=transform="translate(-50px,-150px) rotateX(-720deg) rotateY(-360deg)";
                opacity=0;
            };
            if(this.xIndex==14 && this.yIndex==5)
            {
                this.addEventListener("webkitTransitionEnd",end,false);
                this.addEventListener("transitionend",end,false);
            }

        },50,-1,-1);
    }
    function end(e)
    {
        if(e.propertyName.indexOf('transform')!=-1)
        {
            this.parentNode.style.left="800px";
            for(var i=0;i<aUl.length;i++)
            {
                 aUl[i].style.zIndex=aUl.length-i;
            }
            goback(aUl[iNow].children,iRows,iCeils);
            iNow=that.index;
            switch(iNow) {
                case 0:
                    iNowO=$('.content div').eq(iNow).children()
                    iNowO.addClass('move');
                    iNowO.attr('style','');
                    break;
                case 1:
                    $('.content div').eq(iNow).find('*').attr('style','')
                    $('.bottom').css({opacity:1});
                    $('.bike').show().animate({width:710});
                    timer=setInterval(function(){
                        var w=parseInt($('.bike').css('width'));
                        if(w>=130){
                            $('.bike span').eq(0).show().css({'-webkit-transform':'translateX(130px)'});
                            $('.con2 div').eq(2).css({opacity:1})
                        }
                        if(w>=470){
                            $('.bike span').eq(1).show().css({'-webkit-transform':'translateX(290px)'})
                            $('.con2 div').eq(3).css({opacity:1})
                        }
                        if(w>=610){
                            $('.bike span').eq(2).show().css({'-webkit-transform':'translateX(530px)'})
                        }
                        if(w>=610){clearInterval(timer)}

                    },16);
                    break;
                case 2:
                    $('.con3 *').attr('style','');
                    $('.con3 img').animate({opacity:1},function(){
                        $('.con3 div').eq(0).animate({height:40},'fast',function(){
                            $('.con3 div').eq(4).animate({width:560},'fast',function(){
                                $('.con3 div').eq(1).animate({height:60},'fast')
                                $('.con3 div').eq(2).animate({height:60},'fast')
                                $('.con3 div').eq(3).animate({height:60},'fast',function(){
                                    $('.con3 a').css({opacity:1,transition:3})
                                })  
                            })
                        })
                    })
                    $('.con3 a').on('mouseover',function(){$(this).children().addClass('up')}).on('mouseout',function(){
                        $(this).children().removeClass('up')})
                    break;
                case 3:
                    $('.con4 div').removeClass('show');
                    $('.con4').removeAttr('style');
                    $('.con4').find('*').removeAttr('style');

                    var timer=null;
                    var i=0;
                    $('.con4').css({opacity:1})
                    clearInterval(timer);
                    timer=setInterval(function(){
                        $('.con4 span').eq(i).css({transition:'1s'});
                        $('.con4 div').eq(i).addClass('show');
                        i++;
                        // alert(1)
                        if(i>=$('.con4 div').length){
                            clearInterval(timer)
                        }
                    },200)
                    break;
            }             
            on=true;
        }
    }
    $('.content div').eq(0).children().addClass('move');
}

function goback(obj,iRows,iCeils)
{
    for(var i=0;i<iRows;i++)
    {
        for(var j=0;j<iCeils;j++)
        {
            obj[i*iCeils+j].style.cssText='background-position:'+(-j*48+'px -'+i*48+'px');
        }
    }
}
function toTab(aXy,x,y,fn,iDelay,iDisX,iDisY)
{
	if(!aXy[y] || !aXy[y][x])
	{
		return;
	}
	if(fn)
	{
		fn.call(aXy[y][x]);
		clearTimeout(aXy[y][x].timer);
		aXy[y][x].timer=setTimeout(function(){
			toTab(aXy,x+iDisX,y,fn,iDelay,iDisX,iDisY);
			toTab(aXy,x,y+iDisY,fn,iDelay,iDisX,iDisY);
		},iDelay)
	}
}
function setXy(oBjs,iCeils,iRows)
{
	var arr=[];
	for(var i=0;i<iRows;i++)
	{
		var arr2=[];
		for(var j=0;j<iCeils;j++)
		{
			oBjs[i*iCeils+j].xIndex=j;
			oBjs[i*iCeils+j].yIndex=i;
			oBjs[i*iCeils+j].style.backgroundPosition=-j*48+"px -"+i*48+"px";
			arr2.push(oBjs[i*iCeils+j]);
		}
		arr.push(arr2);
	}
	return arr;
}