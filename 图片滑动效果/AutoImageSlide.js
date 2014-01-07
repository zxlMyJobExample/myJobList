/*
	Author:zxl;
	Date:2012-06-28;
	Email:zxl816@gmail.com;
	QQ: 530272877;
*/

function AutoImageSlide(obj)
{
	ImageSlide.call(this,obj);
	this.timer=null;
}

for(var i in ImageSlide.prototype)
{
	AutoImageSlide.prototype[i]=ImageSlide.prototype[i];
}
AutoImageSlide.prototype.init = function()
{
	this.auto();
	this.over();
	this.out();
}

AutoImageSlide.prototype.auto = function()
{
	var This=this;
	this.timer=setInterval(function()
	{
		This.iNow++;
		This.iNow=This.iNow%This.iImgLen;
		This.slideFn();
		
	},2000);
}

AutoImageSlide.prototype.over = function()
{
	var This=this;
	this.oMark.onmouseover = function()
	{
		clearInterval(This.timer);
		This.iNow++;
		This.iNow=This.iNow%This.iImgLen;
		This.slideFn();
		
	}
}
AutoImageSlide.prototype.out = function()
{
	var This=this;
	this.oMark.onmouseout = function()					//当鼠标移开的时候，让旧的方向等于新的
	{
		This.recordDir=This.nowDir;
		This.auto();
	}

}
