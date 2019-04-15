const express = require('express')
const fs = require('fs')

const router = express.Router()

const multer = require('multer')

const User = require('../models/User')

let responseData = {}
router.use((req, res, next) => {
	responseData = {
		code: 0,
		message: '',
		isAdmin: false
	}
	next() 
})
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads')
	},
	
	filename: function(req, file, cb) {
		var fileformat = (file.originalname).split('.');
		cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
	}
})

     
var upload = multer({
	storage: storage
})
router.post('/title-upload', upload.single('pic'), (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //设置允许跨域
	var file = req.file
	let response = {
		"code": 0,
		"url":`/uploads/${file.filename}`
	}
	res.json(response)

})


router.post('/essay-upload', (req, res, next) => {

})


router.post('/user/register', (req, res, next) => {

	let username = req.body.parmas.username
	let password = req.body.parmas.password
	let repassword = req.body.parmas.repassword
	if(!username) {
		responseData.message = "用户名不能为空"
		responseData.code = 1
		res.json(responseData)
		return
	}
	if(!password) {
		responseData.message = "密码不能为空"
		responseData.code = 2
		res.json(responseData)
		return
	}
	if(password != repassword) {
		responseData.message = "两次密码输入不一致"
		responseData.code = 3
		res.json(responseData)
		return
	}

	User.findOne({
		username: username
	}).then((findInfo) => {
		if(findInfo) {
			responseData.code = 4
			responseData.message = "用户名已经被注册"
			res.json(responseData)
			return
		}
		let head = Math.floor(Math.random() * 10) //分配用户头像  0~10随机数
		let user = new User({
			username: username,
			password: password,
			blogHead: `/public/images/head/${head}.jpg`
		})
		user.save() //将数据储存到数据库中
	}).then((newUserInfo) => {

		responseData.message = "注册成功"
		res.json(responseData)
	})

})
//登录
router.post('/user/login', (req, res, next) => {
	let username = req.body.params.username
	let password = req.body.params.password
	if(!username || !password) {
		responseData.code = 2
		responseData.message = "用户名或者密码不能为空"
		res.json(responseData)
		return
	}

	User.findOne({
		username: username,
		password: password
	}).then((userInfo) => {
		if(!userInfo) {
			responseData.code = 3
			responseData.message = "用户名或者密码错误"
			res.json(responseData)

		}
		try {
			res.cookie('userInfo', JSON.stringify({
				_id: userInfo._id,
				username: userInfo.username,
				isAdmin: userInfo.isAdmin,
				blogHead: userInfo.blogHead
			}))
			responseData.isAdmin = userInfo.isAdmin
			responseData.message = "登录成功"
			res.json(responseData)

		} catch(e) {
		}

	})
})
//删除cookie 
router.get('/user/del', (req, res, next) => {
	res.clearCookie('userInfo')
	res.send('ok')
})

module.exports = router