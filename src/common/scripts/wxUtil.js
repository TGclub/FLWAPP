/* 微信接口
 * 拆分出来的原因：在组件内部保留抽象，方便日后替换掉wx接口模块，换上其他模块就可以构建为普通的Web应用 */
const configFn = (wxAPI, config = {}) => {
	return new Promise((resolve, reject) => {
		config.success = res => (resolve(res))
		config.fail = err => (reject(err))
		wxAPI(config)
	})
}

const ajax = ({url, method, data, headers}) => {
	return configFn(wx.request, {
		url: url,
		method: method,
		data: data,
		header: headers
	})
}

/**
 * 跳转
 * @param url {String} 跳转相对路径
 * @return {Promise}
 */
const tabBarUrl = ['./home', './account/home', './stuTrend', '../home']
const jumpTo = (url) => {
	if (url === tabBarUrl[0] || url === tabBarUrl[1] || url === tabBarUrl[2] || url === tabBarUrl[3]) {
		return configFn(wx.switchTab, {url})
	} else {
		return configFn(wx.navigateTo, {url})
	}
}

/**
 * 关闭所有页面，打开到应用内的某个页面。
 * @param url
 */
const reLaunch = (url) => {
	return configFn(wx.reLaunch, {url})
}

const redirectTo = (url) => {
	return configFn(wx.redirectTo, {url})
}

const goBack = () => {
	wx.navigateBack()
}

const toast = (title, icon = 'none', duration = 1500, hasMask = false) => {
	return configFn(wx.showToast, {
		title: title, // 提示的内容
		icon: icon, // 图标，有效值 "success", "loading", "none"
		duration: duration, // 提示的延迟时间，单位毫秒，默认：1500
		mask: hasMask // 是否显示透明蒙层，防止触摸穿透，默认：false
	})
}

const modal = (content, title) => {
	return new Promise((resolve, reject) => {
		wx.showModal({
			title: title,
			content: content,
			success: res => resolve(res),
			fail: err => reject(err)
		})
	})
}

const showLoading = (title = '加载中', content = 'loading', mask = 'true') => {
	return configFn(wx.showLoading, {title, content, mask})
}

const hideLoading = () => {
	wx.hideLoading()
}

const setNavbarTitle = (title) => {
	return configFn(wx.setNavigationBarTitle, {title})
}

const showNavbarLoading = () => {
	wx.showNavigationBarLoading()
}

const hideNavbarLoading = () => {
	wx.hideNavigationBarLoading()
}

const wxLogin = () => {
	return configFn(wx.login)
}

const showImage = (url) => {
	return configFn(wx.previewImage, {
		urls: [url]
	})
}

const wxGetUserInfo = () => {
	return configFn(wx.getUserInfo)
}

const setStorage = (key, value) => {
	// return configFn(wx.setStorage, {
	// 	key,
	// 	data: value
	// })
	return wx.setStorageSync(key, value)
}

const getStorage = (key) => {
	// return configFn(wx.getStorage, {
	// 	key
	// })
	return wx.getStorageSync(key)
}

const removeStorage = (key) => {
	// return configFn(wx.removeStorage, {
	// 	key
	// })
	return wx.removeStorage({key})
}

const clearStorage = () => {
	return wx.clearStorage()
}

const chooseImg = (count) => {
	return new Promise((resolve, reject) => {
		wx.chooseImage({
			count: count,
			sizeType: ['compressed'],
			success: (res) => resolve(res),
			fail: (err) => reject(err)
		})
	})
}
const UpLoadFile = (filePath, formData) => {
	return new Promise((resolve, reject) => {
		wx.uploadFile({
			url: 'https://upload.qiniu.com',
			filePath: filePath,	//	本地路径名
			name: 'file',
			formData: formData,
			success: res => resolve(res),
			fail: err => reject(err)
		})
	})
}
const changeNavBarColor = (frontColor0x = '#ffffff', backgroundColor0x = '#db4d3d', animation = {
	duration: 400, timingFunc: 'easeIn'
}) => {
	wx.setNavigationBarColor({
		frontColor: frontColor0x,
		backgroundColor: backgroundColor0x,
		animation
	})
}
const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		wx.getUserInfo({
			success: res => resolve(res),
			fail: err => reject(err)
		})
	})
}
const interceptTourist = () => {
	return wx.showModal({
		title: '提示',
		content: '您现在尚未注册，是否前往注册？',
		success: res => {
			if (res.confirm) {
				wx.reLaunch({
					url: '/pages/account/login'
				})
			}
		}
	})
}

export {
	ajax, // 发送ajax请求
	jumpTo, // page跳转
	goBack, // 回到上一层page
	redirectTo, // page重定向
	reLaunch, // page重加载
	toast, // 显示弹窗
	modal, //	显示模态弹窗
	showLoading, // 显示加载中弹窗
	hideLoading, // 关闭加载中弹窗
	setNavbarTitle, // 设置导航栏标题
	showNavbarLoading, // 在当前页面显示导航条加载动画
	hideNavbarLoading, // 隐藏导航条加载动画。
	wxLogin, // 获取微信用户登录code
	wxGetUserInfo, // 获取微信用户信息
	setStorage, // 设置缓存
	getStorage, // 获取缓存
	removeStorage, // 删除某条缓存数据
	clearStorage, // 清空缓存数据
	changeNavBarColor, // 改变顶部栏的颜色
	chooseImg,	//	选择图片
	UpLoadFile,	//	上传文件
	getUserInfo,
	interceptTourist, //	拦截游客非法访问
	showImage // 全屏预览图片
}
