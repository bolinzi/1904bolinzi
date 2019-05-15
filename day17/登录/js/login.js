function Login () {
	this.btn = tools.$("#btn");
	this.container = tools.$("#container");
	this.bindEvents();
	
}

// 给按钮绑事件
Login.prototype = {
	constructor: Login, // 修改了prototype的引用，所以constructor重新指回去，不破坏原型链结构
	bindEvents: function () {
		this.btn.onclick = function () {
			this.popBox();
		}.bind(this);
		
		// 删除和登录按钮事件委托给container
		this.container.onclick = e => {
			// 使用case穿透登录的时候也会执行关闭事件的代码
			switch(e.target.id) {
				case "loginBtn": this.loginBtnClick();
				case "closeBtn": this.closeBtnClick(); break;
				
			}
		}
		
	},
	// 弹出登录框的方法
	popBox: function () {
		// container里面添加登录框
		this.container.innerHTML = '<h4>用户登录</h4><a id="closeBtn" class="close_btn" href="javascript:;">×</a><p><label>用户名：<input id="username" type="text"></label></p><p><label>密　码：<input id="password" type="password"></label></p><p><button id="loginBtn" class="loginBtn" type="button">登录</button></p>';
		// 居中显示
		tools.showCenter(this.container);
		// modal遮罩
		this.modal = document.createElement('div');
		this.modal.className = "modal";
		document.body.appendChild(this.modal);
		
		// 可拖拽
		new Drag(this.container, "h4");
	},
	// 关闭按钮的方法
	closeBtnClick: function () {
		this.container.style.display = "none";
		this.modal.remove();
	},
	// 登录按钮的方法
	loginBtnClick: function () {
		// 获取用户名和密码
		let username = tools.$("#username").value;
		let password = tools.$("#password").value;
		if(username === "" || password === "") {
			alert("用户名或密码不能为空");
		}else{
			// ---- 发送后端，完成登录
			console.log(username, password);
		}
	}
	
}

new Login()