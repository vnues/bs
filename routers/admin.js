const express = require('express')

const router = express.Router()

const User = require('../models/User')

const Ly = require('../models/Ly')

const Essay = require('../models/Essay')

const multer = require('multer')
let responseData;

router.use((req, res, next) => {

	responseData = {
		code: 0,
		message: ''

	}
	next()

})

//栏目
router.get('/category', (req, res, next) => {

	res.render('category')
})

router.post('/essay/delcheckbox', (req, res, next) => {

	console.log(req.body.id)

	let checkId = req.body.id
	Essay.remove({
		_id: {
			$in: req.body.id
		}
	}).then((err) => {
		console.log(err) //返回错误
		// 
		responseData.code = 0
		responseData.message = "删除成功"
		res.json(responseData)
	})

})


//删除文章 
router.post('/del-essay', (req, res, next) => {
	console.log(req.body)
	Essay.remove({ _id: req.body.id }).then((err) => {
		//第一个参数永远是err  已经写好这个名称的 不用怕newuser什么重复
		responseData.code = 0
		responseData.message = "删除成功"
		res.json(responseData)


	})
})



//更新文章

router.post('/update-essay', (req, res, next) => {

	Essay.update({
		_id: req.body.id
	}, {
			category: req.body.category,
			essay: {
				info: req.body.info,
				title: req.body.title,
				markdown: req.body.markdown,
				date: date
			}

		}).then((err) => {
			console.log(err) //{ n: 1, nModified: 0, ok: 1 }  状态码  不能用于判断
			responseData.code = 0
			responseData.message = "修改成功"
			res.json(responseData)


		})

})

//修改文章 -a链接会跳转
router.get('/get-article', (req, res, next) => {
	let id = req.query.id
	Essay.findOne({
		_id: id
	}).then((Oldessay) => {
		res.render('update-article', {
			Oldessay: Oldessay,
			id: id
		})
	})

})

//上传图片
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		var fileformat = (file.originalname).split('.');
		cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
	}
})

var upload = multer({
	storage: storage
})

router.post('/put/essaypic', upload.single('editormd-image-file'), (req, res, next) => {
	var file = req.file
	console.log(file)
	let data = {
		success: 1,
		message: "上传成功",
		url: `/uploads/${file.filename}`
	}
	res.json(data)
})

//增加文章
let date;
router.use((req, res, next) => {
	var year = new Date().getFullYear()
	var month = new Date().getMonth() + 1
	var day = new Date().getDate()

	date = "" + year + "-" + month + "-" + day + ""
	next()
})

router.post('/add-essay', (req, res, next) => {
	console.log(req.body);
	console.log(date)
	let newEssay = new Essay({
		category: req.body.category,
		essay: {
			info: req.body.info,
			title: req.body.title,
			markdown: req.body.markdown,
			date: date
		}
	})
	newEssay.save((err, essay) => {
		//console.log(essay)
		responseData.code = 0
		responseData.message = "文章增加成功"
		res.json(responseData)

	})

})

router.get('/ly', (req, res, next) => {
	let limit = 8

	let page = Number(req.query.page || 1)

	let skip = (page - 1) * limit

	Ly.count().then((count) => {
		let pages = Math.ceil(count / limit)
		page = Math.min(page, pages)
		page = Math.max(1, page)

		Ly.find().limit(limit).skip(skip).then((allLy) => {
			res.render('ly', {
				ly: allLy,
				pages: pages,
				page: page
			})

		})
	})

})

//删除留言
router.post('/ly/del', (req, res, next) => {

	let id = req.body.id
	Ly.remove({
		_id: id
	}).then((err) => {

		responseData.code = 0
		responseData.message = "删除成功"
		res.json(responseData)
	})

})
router.post('/ly/delcheckbox', (req, res, next) => {
	let checkId = req.body.id
	Ly.remove({
		_id: {
			$in: req.body.id
		}
	}).then((err) => {
		responseData.code = 0
		responseData.message = "删除成功"
		res.json(responseData)
	})

})

router.get('/report', function (req, res, next) {
	res.render('index')
})

router.get('/user', (req, res, next) => {

	User.count().then((count) => {
		let limit = 3;
		let page = Number(req.query.page || 1) //当前页
		//当前最小值 1
		let pages = Math.ceil(count / limit)
		page = Math.min(page, pages)
		page = Math.max(page, 1)
		let skip = (page - 1) * limit //忽略前面n条
		User.find().limit(limit).skip(skip).then((users) => {
			res.render('user', {
				users: users,
				page: page,
				pages: pages
			})
		})
	})

})
//渲染文章
router.get('/article', (req, res, next) => {
	var page = Number(req.query.page || 1)
	Essay.count().then((count) => {
		var limit = 20
		var skip = (page - 1) * limit
		var pages = Math.ceil(count / limit)
		console.log(pages)
		page = Math.min(page, pages)
		page = Math.max(page, 1)
		Essay.find().limit(limit).skip(skip).then((Newessay) => {
			let sort = ['地理风俗', '名人贤士', '民间艺术', '旅游景点', '教育基地', '潮州名片', '后记']
			res.render('article', {
				Newessay: Newessay,
				page: page,
				pages: pages,
				sort: sort
			})
		})

	})

})

router.get('/add-article', (req, res, next) => {

	res.render('add-article')
})

router.get('/user/see', (req, res, next) => {
	User.findOne({
		_id: req.query.id
	}).then((user) => {
		res.json(user)
	})

})
router.post('/user/add', (req, res, next) => {
	let newUser = req.body
	let user = new User({
		username: newUser.username,
		password: newUser.password,
		isAdmin: newUser.isAdmin
	})
	user.save()
	res.send('添加成功')
})

router.post('/user/edit', (req, res, next) => {
	let newUser = req.body
	User.update({
		_id: req.body.id
	}, {
			username: newUser.username,
			password: newUser.password,
			isAdmin: newUser.isAdmin
		}).then((err, res) => {
			res.json("修改成功")
		})

})
//删除用户信息
router.post('/user/del', (req, res, next) => {
	console.log(req.body)
	User.remove({
		_id: req.body.id
	}).then((res) => {

	}).catch((e) => { })
	res.send('删除成功')

})

module.exports = router