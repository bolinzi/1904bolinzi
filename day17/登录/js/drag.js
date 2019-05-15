class Drag {
	constructor (obj, title) {
		this.obj = obj;
		this.title = this.obj.querySelector(title);
		this.init();
	}
	
	init () {
		this.title.onmousedown = e => {
			let x = e.offsetX, 
				y = e.offsetY;
			console.log(x,y);
			document.onmousemove =  e => {
				let _left = e.clientX - x,
					_top = e.clientY - y;
					
				console.log("-----");
				console.log(e.clientX , x);
				this.move(_left, _top);
			}
			document.onmouseup = function () {
				document.onmousemove = null;
			}
			return false;
		}
	}
	
	move (left, top) {
		// 设置样式left,top
		tools.setStyle(this.obj, {
			left: left + "px",
			top: top + "px"
		});
	}
}

// new Drag("#box", "h4");