/*
	Author:zxl;
	Date:2012-06-28;
	Email:zxl816@gmail.com;
	QQ: 530272877;
*/

function ImageSlide(obj)
{
	this.oMark=getByClass(obj,'mark')[0];
	this.oBox=getByClass(obj,'box')[0];
	this.aImg=this.oBox.getElementsByTagName('img');

	this.direction=['top','right','bottom','left'];  	//定义四个方向
	this.recordDir='left';								//默认给它一个值，前一次的方向
	this.nowDir='left';									//当前的方向
	this.thisImg=null;									//当前要移动的img
	this.iImgLen=this.aImg.length;					 	//取得图片的个数
	this.flag=1;										//判断方向的变量
	this.iRange=0;										//取宽或高的变量
	this.iNow=-1;										//当前的索引
	this.nextNow=0;										//下一个的索引
	this.iLength=0;										//距离
	
	
}

ImageSlide.prototype.init = function()
{
	this.over();
	this.out();
}

ImageSlide.prototype.over = function()
{
	var This=this;
	this.oMark.onmouseover = function()
	{
		
		This.iNow++;
		This.iNow=This.iNow%This.iImgLen;
		This.slideFn();
		
	}
}

ImageSlide.prototype.slideFn = function()
{
	for(i=0; i<this.iImgLen; i++)
	{
		clearInterval(this.aImg[i].timer);			//清除所有IMG的运动
		setStyleJson(this.aImg[i],{zIndex:1,display:'none',left:0,top:0});//把它们都定位回初始
	}
	
	this.thisImg=this.aImg[this.iNow];				//当前的图片是数组里的第一个
	this.thisImg.style.zIndex=this.iImgLen;			//当前图片的zindex
	this.thisImg.style.display='block';				//当前图片显示
	
	
	this.nextNow=this.iNow+1; 						//下一个图片的索引
	this.nextNow=this.nextNow%this.iImgLen; 		//循环的
	
	setStyleJson(this.aImg[this.nextNow],{zIndex:this.iImgLen-1,display:'block',left:0,top:0,opacity:100});//然后设置它的位置和透明度，回归原位
	
	

	this.nowDir=this.direction[GetRandomNum(0,this.direction.length-1)]; //先取一个随机数，然后取得方向的值 
	if(this.nowDir==this.recordDir)						//判断如果当前的跟上一次的一样
	{
		while(this.nowDir==this.recordDir)				//就执行这个循环，再取随机数，直到不相等了
		{
			this.nowDir=this.direction[GetRandomNum(0,this.direction.length-1)];
		}
	}
	
	
	this.flag = this.nowDir == 'left' || this.nowDir == 'top' ? -1 : 1;//判断正负的，如果是left,top就是负的反之就是正的
	this.iRange = this.nowDir == 'top' || this.nowDir == 'bottom' ? this.thisImg.offsetHeight : this.thisImg.offsetWidth;//取宽度的，如果是top,bottom,就取高，以之取宽
	this.iLength=this.flag*this.iRange;						//计算出要运动的距离
	
	
	if(this.nowDir == 'left' || this.nowDir == 'right')
	{
		startMove(this.thisImg,{left:this.iLength,opacity:0});
	}
	else if(this.nowDir == 'top' || this.nowDir == 'bottom')
	{
		startMove(this.thisImg,{top:this.iLength,opacity:0});
	}

}

ImageSlide.prototype.out = function()
{
	var This=this;
	this.oMark.onmouseout = function()					//当鼠标移开的时候，让旧的方向等于新的
	{
		This.recordDir=This.nowDir;
	}

}




//取得随机数
function GetRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}  


//取className
function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//取得样式的方法
function getStyle(obj,attr)
{
	var result=0;
	if(obj.currentStyle)
	{
		result=obj.currentStyle[attr];
	}
	else
	{
		result=getComputedStyle(obj,false)[attr];
	}
	if(attr=='opacity')
	{
		result*=100;
		result=Math.round(result);
	}
	return parseInt(result);
}

//设置样式的方法
function setStyle(obj,attr,value)
{
	switch(attr)
	{
		case 'opacity':
		obj.style.opacity=(value/100).toFixed(2);
		obj.style.filter='alpha(opacity:'+ value +')';
		break;
		case 'width':
		case 'height':
		case 'padding':
		case 'paddingLeft':
		case 'paddingTop':
		case 'paddingBottom':
		case 'paddingRight':
		obj.style[attr]=Math.max(value,0)+'px';
		case 'top':
		case 'left':
		case 'bottom':
		case 'right':
		case 'margin':
		case 'marginLeft':
		case 'marginTop':
		case 'marginRight':
		case 'marginBottom':
		obj.style[attr]=value+'px';
		break;
		default:
		obj.style[attr]=value;
	}
}

function setStyleJson(obj,json)
{
	for(var attr in json)
	{
		switch(attr)
		{
			case 'opacity':
			obj.style.opacity=(json[attr]/100).toFixed(2);
			obj.style.filter='alpha(opacity:'+ json[attr] +')';
			break;
			case 'width':
			case 'height':
			case 'padding':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingBottom':
			case 'paddingRight':
			obj.style[attr]=Math.max(json[attr],0)+'px';
			case 'top':
			case 'left':
			case 'bottom':
			case 'right':
			case 'margin':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
			obj.style[attr]=json[attr]+'px';
			break;
			default:
			obj.style[attr]=json[attr];
		}
	}
}


//开始运动库
function startMove(obj,json,fn)
{
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		doMove(obj,json,fn);
	},30);
}


//运动库
function doMove(obj,json,fn)
{
	
	var isFinihed=true;
	for(var attr in json)
	{
		var iCur=getStyle(obj, attr);
		var iTarget=json[attr];
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		var iNew=iCur+iSpeed;
		if(iCur!=iTarget)
		{
			isFinihed=false;
		}
		setStyle(obj,attr,iNew);
	}
	
	if(isFinihed)
	{
		clearInterval(obj.timer);
		if(fn)
		{
			fn();
		}
	}
}
