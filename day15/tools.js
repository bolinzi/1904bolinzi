var tools = {
	/* 查找DOM元素
	 * @param selector <string> 选择器
	 * @param [isAll] <boolean> 是否查询所有，默认为false
	 * @param [parent] <DOMObject> 父级对象，默认为document
	 * @return  DOMObject  || NodeList
	 */
	 $: function (selector, isAll, parent) {
		// 判断是否传了父级对象
		parent = parent || document;
		if(isAll){
			// isAll如果为true就返回所有
			return parent.querySelectorAll(selector);
		}
		return parent.querySelector(selector);
	},
	
	/* 获取元素的某一条样式
	 * @param obj <DOMObject>  要获取样式的元素
	 * @param attr <string>    样式名
	 * @return <string>  样式值
	 */
	getStyle: function (obj, attr) {
		if(obj.currentStyle) {
			// IE兼容
			return obj.currentStyle[attr];
			
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	},
	
	/* 计算元素距离浏览器边缘的偏移
	 * @param obj <DOMObject> 要计算的那个元素
	 * @return  {left, top}
	 */
	getBodyDis: function (obj) {
		var left = 0, top = 0;
		while(obj.offsetParent !== null){
			// 加上offsetParent的边框
			left += obj.offsetLeft + obj.offsetParent.clientLeft;
			top += obj.offsetTop + obj.offsetParent.clientTop;
			// 往前走一步
			// 把自己变成父亲
			obj = obj.offsetParent;
		}
		return {
			"left" : left,
			"top" : top
		};
	},
	
	/* 得到可视区窗口的大小
	 * @return {width, height}
	 */
	getBodySize: function () {
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	
	/* 添加事件监听
	 * @param obj <DOMObject> 监听事件得DOM对象
	 * @param type <string> 事件类型（不带on)
	 * @param fn <Function> 事件预处理函数
	 * @param [isCapture] <Boolean> 是否捕获，默认为false
	 */
	on: function (obj, type, fn, isCapture) {
		// isCapture如果没有传的话默认值为false
		isCapture = isCapture === undefined ? false : isCapture;
		if(obj.attachEvent){
			// IE
			obj.attachEvent('on'+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
	},
	/* 移出事件监听
	 * @param obj <DOMObject> 监听事件得DOM对象
	 * @param type <string> 事件类型（不带on)
	 * @param fn <Function> 事件预处理函数
	 * @param [isCapture] <Boolean> 是否捕获，默认为false
	 */
	off: function (obj, type, fn, isCapture) {
		// isCapture如果没有传的话默认值为false
		isCapture = isCapture === undefined ? false : isCapture;
		if(obj.detachEvent){
			// IE
			obj.detachEvent('on'+type, fn);
		}else{
			obj.removeEventListener(type, fn, isCapture);
		}
	},
	
	/* 给元素写匀速运动动画
	 * @param obj  <DOMObject> 运动的元素
	 * @param attr <string>    运动的属性名称
	 * @param end  <number>    运动的终点
	 * @param time <number>    运动总时间
	 * @param fn <function>    运动结束之后的回调函数
	 */
	move: function (obj, attr, end, time, fn) {
		// 先清除上一次的timer
		clearInterval(obj.timer);
		// 获取起点值
		let start = parseInt(this.getStyle(obj, attr));
		// 计算总距离
		let distance = end - start;
		// 根据时间计算总步数, 为了避免超出终点值，向下取整
		let steps = Math.floor(time / 20);
		// 速度  px/步
		let speed = distance / steps;
		
		// 开始运动
		let n = 0; // 记录当前步数
		obj.timer = setInterval(function () {
			n++;
			obj.style[attr] = start + n*speed + "px";
			// 如果到达终点（步数走完）
			if(n === steps) {
				clearInterval(obj.timer);
				// 有可能距离终点还差0.几步
				obj.style[attr] = end + "px";
				// 执行回调
				fn && fn();
			}
		}, 20);
	},
	
	/* 给元素写缓冲运动动画
	 * @param obj  <DOMObject> 运动的元素
	 * @param attr <string>    运动的属性名称
	 * @param end  <number>    运动的终点
	 * @param fn   <function>  运动结束之后的回调函数
	 */
	move2: function (obj, attr, end, fn) {
		let start = parseInt(this.getStyle(obj, attr));
		clearInterval(obj.timer);
		
		obj.timer = setInterval(function () {
			// 剩下距离 = 终点值 - 当前位置
			let distance = end - start;
			// 计算速度，每一步的速度都是剩下距离的1/10
			// 速度在最后几步最后都要变成1px，但是正负方向不一样
			let speed = distance > 0 ?  Math.ceil(distance/10) : Math.floor(distance/10);
			console.log(distance, speed);
			// 往前移动一步
			start += speed;
			
			obj.style[attr] = start + "px";
			
			// 判断终点
			if(start === end) {
				clearInterval(obj.timer);
				fn && fn();
			}
			
			
			
		}, 20);
		
	}
}


