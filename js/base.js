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

