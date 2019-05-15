var tools = {
	/* 查找DOM对象
	 * @param selector string css基本选择器
	 * @param [parent] DOMobj 父级元素对象
	 * @return   DOMobj || HTMLCollection
	 */
	$: function(selector ,parent){
		parent = parent || document;
		switch(selector.charAt(0)){
			case "#":
				return document.getElementById(selector.slice(1));
			case ".":
				return parent.getElementsByClassName(selector.slice(1));
			default:
				return parent.getElementsByTagName(selector);
		}
	},
	
	/*获取外部样式
	 * @param obj  DOMobj 要获取属性的DOM对象 
	 * @param attr string 获取某一条属性的属性名
	 * @return  string  obj的attr属性值
	 */
	getStyle: function(obj, attr){
		if(obj.currentStyle){ //针对IE
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},
	
	/* 获取body宽高
	 * 
	 * @return obj {width,height}
	 * */
	getBody: function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		};
	},
	
	/*让元素在body里绝对居中
	 * @param obj  DOMobj 居中的那个元素对象
	 */
	
	showCenter: function(obj){
		
		//console.log(this);
		//this在不同执行环境指向的对象是不一样的，所以用一个变量在指向变化之前先存下来
		var _this = this;
		
		//obj相对于body定位
		document.body.appendChild(obj);
		obj.style.position = "absolute";
		
		function center(){
			//console.log(_this);
			var _left = (_this.getBody().width - obj.offsetWidth)/2,
				_top = (_this.getBody().height - obj.offsetHeight)/2;
			obj.style.left = _left + "px";
			obj.style.top = _top + "px";
		}
		
		center();
		window.onresize = center;
		
	},
	/* 获取和设置样式
	 * @param obj DOMobj 设置谁的样式
	 * @param oAttr obj  {left:"200px",top:"100px"} 设置css
	 * @param oAttr string 获取属性值  @return string  oAttr对应的属性值
	 * */
	css: function(obj,oAttr){
		if(typeof oAttr === "string"){
			return obj.style[oAttr];
		}else{
			for(var key in oAttr){
				obj.style[key] = oAttr[key]; 
			}
		}
		
	},
	
	/*添加事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
	on: function(obj, type, fn){
		//兼容判断
		if(window.attachEvent){
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, false); //第三个参数指是否捕获，默认是false
		}
	},
	
	/*移除事件监听
	 * @param obj DOMobj 添加事件的DOM元素
	 * @param type string 事件句柄
	 * @param fn Function 事件处理函数
	 * */
	off: function(obj, type, fn){
		window.detachEvent ?
			obj.detachEvent("on"+type, fn) :
			obj.removeEventListener(type, fn, false);
	},
	
	/* 存取cookie
	 * @param [key] string cookie的名称    [如果不传的话，获取所有cookie  @return object]
	 * @param [value] string cookie的值   [如果不传，获取cookie, @return string]
	 * @param [exp] object  {expires:3,path:"/"} 
	 * */
	cookie: function(key, value, exp){
		
		
		//判断value是否有效
		if(value === undefined){
			//获取
			var obj = new Object();
			var str = document.cookie;
			var arr = str.split("; ");
			for(var i = 0; i < arr.length; i++){
				var item = arr[i].split("=");
				obj[item[0]] = item[1];
			}
			
			//判断有没有取到
			
			//是否传了key
			if(key){
				return obj[key] ? decodeURIComponent(obj[key]) : undefined;
			}else{
				return obj;
			}
			
			
		}else{
			//拼接expires
			var str = "";
			if(exp){
				//如果传了过期时间
				if(exp.expires){
					//设置new Date到过期的那一天
					var d = new Date();
					d.setDate(d.getDate()+exp.expires);
					str += ";expires="+d;
				}
				//如果传了path
				if(exp.path){
					str += ";path="+exp.path;
				}
			}
			
			document.cookie = key+"="+encodeURIComponent(value)+str;
		}
	}
}
