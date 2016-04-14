/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-12-09 22:25:44
 * @version $Id$
 */

/* 公共函数  */
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName]; 
}

function addWheel(obj,fn){
	// 火狐
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',_wheel,false); 
	}
	else{
		// 非火狐
		obj.onmousewheel=_wheel; 
	}
	function _wheel(ev){
		var oEvent=ev||event; 
		if(oEvent.wheelDelta){
			down=oEvent.wheelDelta>0?false:true; 
		}
		else{
			down=oEvent.detail>0?true:false; 
		}
		fn(down);
		oEvent.cancelBubble=true;
		oEvent.stopPropagation();
		oEvent.preventDefault&&oEvent.preventDefault(); 
		return false; 
	}
}

function $r(fn){
	if (document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false); 
	}
	else{
		document.onreadystatechange=function (){
			if (document.readyState='complete'){
				fn(); 
			}
		}
	}
}

function getPos(obj){
	var left=0; 
	var top=0; 		
	while(obj){
		left+=obj.offsetLeft; 
		top+=obj.offsetTop; 			
		obj=obj.offsetParent; 
	}
	return {left:left,top:top}; 
}

function getByClass(oParent,sName)
{
	if (oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sName); 
	}
	else{
		var aChild=oParent.getElementsByTagName('*'); 
		var res=[]; 
		
		for (var i=0; i<aChild.length; i++){
			var obj=aChild[i];
			var str=obj.className; 
			//var aTmp=str.split(' ');
			//var aTmp=str.split(/\s+/);
			var reg=new RegExp('\\b+sClass+\\b'); 

			for (var j=0; j<aTmp.length; j++){
				if (reg.test(aTmp[j].className)){
					res.push(obj); 
				}
			}
		}
		return res; 
	}
}

function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b'); 
	return reg.test(obj.className); 
}

function addClass(obj,sClass){
	if (obj.className){
		if (!hasClass(obj,sClass)){
			obj.className+=' '+sClass; 
		}
	} 
	else{
		obj.className=sClass; 
	}
}

function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g'); 
	if (hasClass(obj,sClass)){
		// 替换为空 // 过滤首尾空格 // 中间空格 
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' '); 
	}
}

function toggleClass(obj,sClass){
	if(hasClass(obj,sClass)){
		removeClass(obj,sClass);
	}else{
		addClass(obj,sClass);
	}
}

function addEvent(obj,sEv,fn){
	if (obj.addEventListener){
		obj.addEventListener(sEv,fn,false); 
	}
	else{
		obj.attachEvent('on'+sEv,fn); 
	}
}	

function removeEvent(obj,sEv,fn){
	if (obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false); 
	}
	else{
		obj.detachEvent('on'+sEv,fn); 
	}
}

var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function move(obj,json,options){   
	options=options||{}; 		
	var duration=options.duration||1000;     // 不加var 会全局 覆盖
	var easing=options.easing||Tween.Linear; // 函数体||默认匀速

	var start={}; 
	var dis={};   
	for (var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name]; 
	}

	var count=Math.floor(duration/30); 
	var n=0; 
	clearInterval(obj.timer); 
	obj.timer=setInterval(function (){
		n++; 

		for (var name in json){
			//var cur=n/count*dis[name]+start[name]; 
			var cur=easing(duration*n/count,start[name],dis[name],duration);
			// 调用 
			if (name=='opacity'){
				obj.style[name]=cur; 
				obj.style.filter='alpha(opacity='+cur*100+')';
			}
			else{
				obj.style[name]=cur+'px'; 
			}
		}
		if (n==count){
			clearInterval(obj.timer); 
			options.complete&&options.complete();
		}
	},30);
}
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName]; 
}

/* 此处引用：鼠标滚轮mousewheel插件 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});


/* 获取元素 */
$(function(){
	var i=0;
	var $btn = $('.section-btn li'),
		$navlist = $('.navsum li'),
		$wrap = $('.section-wrap'),
		$arrow = $('.arrow');
	
	/*当前页面赋值*/
	function up(){i++;if(i==$btn.length){i=0}; if(i==$navlist.length){i=0};}
	function down(){i--;if(i<0){i=$btn.length-1}; if(i<0){i=$navlist.length-1}; }
	
	/*页面滑动*/
	function run(){
		$btn.eq(i).addClass('on').siblings().removeClass('on');	
		$navlist.eq(i).addClass('on').siblings().removeClass('on');	
		$wrap.attr("class","section-wrap").addClass(function() { return "put-section-"+i; }).find('.section').eq(i).find('.title').addClass('active');
	};
	
	/*右侧按钮点击*/
	$btn.each(function(index) {
		$(this).click(function(){
			i=index;
			run();
		})
	});

	$navlist.each(function(index) {
		$(this).click(function(){
			i=index;
			run();
		})
	}); 

	/*翻页按钮点击*/
	$arrow.one('click',go);
	function go(){
		up();run();	
		setTimeout(function(){$arrow.one('click',go)},1000)
	};
	
	/*响应鼠标*/
	$wrap.one('mousewheel',mouse_);
	function mouse_(event){
		if(event.deltaY<0) {up()}
		else{down()}
		run();
		event.stopPropagation();
		event.preventDefault&&event.preventDefault(); 
		setTimeout(function(){$wrap.one('mousewheel',mouse_)},1000); 
	};

	/*响应键盘上下键*/
	$(document).one('keydown',k);
	function k(event){
		var e=event||window.event;
		var key=e.keyCode||e.which||e.charCode;
		switch(key)	{
			case 38: down();run();	
			break;
			case 40: up();run();	
			break;
		};
		setTimeout(function(){$(document).one('keydown',k)},1000);
	}
});

/* 导航nav */
;(function (){
	var oNavSum=document.getElementById('navsum');
	var aNavLi=oNavSum.getElementsByTagName('li'); 

	for (var i=0; i<aNavLi.length; i++)
	{
		(function (){
			var oEm=aNavLi[i].getElementsByTagName('em')[0];
			aNavLi[i].onmouseenter=function (){
				var h=this.offsetHeight; 
				move(oEm, {height:h}, {duration:800});
			};
			aNavLi[i].onmouseleave=function (){
				move(oEm, {height:0}, {duration:800});
			};
		})(); 
	}	
})(); 

/* 时钟 */
;(function (){
	var clock = document.querySelector('#utility-clock')
	utilityClock(clock)

	if (clock.parentNode.classList.contains('fill')) autoResize(clock, 295 + 32)
	function utilityClock(container) {
	    var dynamic = container.querySelector('.dynamic')
	    var hourElement = container.querySelector('.hour')
	    var minuteElement = container.querySelector('.minute')
	    var secondElement = container.querySelector('.second')
	    var minute = function(n) {
	        return n % 5 == 0 ? minuteText(n) : minuteLine(n)
	    }
	    var minuteText = function(n) {
	        var element = document.createElement('div')
	        element.className = 'minute-text'
	        element.innerHTML = (n < 10 ? '0' : '') + n
	        position(element, n / 60, 135)
	        dynamic.appendChild(element)
	    }
	    var minuteLine = function(n) {
	        var anchor = document.createElement('div')
	        anchor.className = 'anchor'
	        var element = document.createElement('div')
	        element.className = 'element minute-line'
	        rotate(anchor, n)
	        anchor.appendChild(element)
	        dynamic.appendChild(anchor)
	    }
	    var hour = function(n) {
	        var element = document.createElement('div')
	        element.className = 'hour-text hour-' + n
	        element.innerHTML = n
	        position(element, n / 12, 105)
	        dynamic.appendChild(element)
	    }
	    var position = function(element, phase, r) {
	        var theta = phase * 2 * Math.PI
	        element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
	        element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
	    }
	    var rotate = function(element, second) {
	        element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)'
	    }
	    var animate = function() {
	        var now = new Date()
	        var time = now.getHours() * 3600 +
	                    now.getMinutes() * 60 +
	                    now.getSeconds() * 1 +
	                    now.getMilliseconds() / 1000
	        rotate(secondElement, time)
	        rotate(minuteElement, time / 60)
	        rotate(hourElement, time / 60 / 12)
	        requestAnimationFrame(animate)
	    }
	    for (var i = 1; i <= 60; i ++) minute(i)
	    for (var i = 1; i <= 12; i ++) hour(i)
	    animate()
	}

	function autoResize(element, nativeSize) {
	    var update = function() {
	        var scale = Math.min(window.innerWidth, window.innerHeight) / nativeSize
	        element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
	    }
	    update()
	    window.addEventListener('resize', update)
	}
})(); 

/* 卷轴关于我 */
;(function (){
	var oGBody=document.getElementById('g-body'); 
	var oGMain=document.getElementById('g-main'); 
	var oContMain=getByClass(oGMain,'g-content-bg')[0]; 
	var oMainLeft=getByClass(oGMain,'g-main-left')[0]; 
	var oMainRight=getByClass(oGMain,'g-main-right')[0]; 

	var oControll=document.getElementById('g-cntcontainer'); 
	var aScrollHead=getByClass(oControll,'scrollheadbg'); 
	var aScrollMid=getByClass(oControll,'scrollroll-bg'); 
	var top=0; 
	var MainTop=0; 
	var MaxTop=-5040; 
	var rollMaxTop=1656; 

	oGMain.onclick=function (ev){
		var oEvent=ev||event; 
		addWheel(oGMain,function (dowm){
			if (down){
				;(function (){
					top+=72; 
					if (top>rollMaxTop){
						top=rollMaxTop;
					}
					for (var i=0; i<aScrollHead.length; i++){
						aScrollHead[i].style.transform='translateY('+top+'px)';			
					}
					for (var i=0; i<aScrollMid.length; i++){
						aScrollMid[i].style.transform='translateY('+top+'px)';			
					}				
				})(); 
				;(function (){
					MainTop-=240; 
					if (MainTop<=MaxTop){
						MainTop=MaxTop;
					}
					oContMain.style.transform='translateY('+MainTop+'px)';	
					oMainLeft.style.transform='translateY('+MainTop+'px)';	
					oMainRight.style.transform='translateY('+MainTop+'px)';	
				})(); 
			}
			else{
				;(function (){
					top-=72; 
					if (top<0){
						top=0; 
					}
					for (var i=0; i<aScrollHead.length; i++){						
						aScrollHead[i].style.transform='translateY('+top+'px)';	
					}			
					for (var i=0; i<aScrollMid.length; i++){				
						aScrollMid[i].style.transform='translateY('+top+'px)';					
					}				
				})(); 
				;(function (){
					MainTop+=240; 
					if (MainTop>0){
						MainTop=0;
					}	
					oContMain.style.transform='translateY('+MainTop+'px)';	
					oMainLeft.style.transform='translateY('+MainTop+'px)';	
					oMainRight.style.transform='translateY('+MainTop+'px)';	
				})(); 			
			}
			
		}); 
		oEvent.cancelBubble=true;
		oEvent.stopPropagation();
		oEvent.preventDefault&&oEvent.preventDefault(); 
	}

	var scrollTimer=setTimeout(function (){
		oGBody.style.display='block'; 
		move(oGBody,{
			height:610,
			top:0
		},{
			duration:1000
		});	
	},2000);
})(); 

/* 技能 */
