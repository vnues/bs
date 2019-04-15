const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const Ly = require('../models/Ly')
const Essay = require('../models/Essay')
let responseData;
router.use((req, res, next) => {
	responseData = {
		code: 0,
		message: '',
		ly: [],
		essay: [],
		pages: 1

	}
	next()
})
//其他页面文章
router.get('/otherarticle', (req, res, next) => {

	let category = req.query.category
	Essay.find({ category: category }).limit(6).then((essay) => {
		let count = essay.length
		let page = Number(req.query.page || 1)
		let limit = 6
		let skip = (page - 1) * limit
		let pages = Math.ceil(count / page)

		page = Math.min(page, pages)
		page = Math.max(1, page)
		Essay.find({ category: category }).limit(limit).skip(skip).then((essay) => {
			responseData.code = 0
			responseData.message = "成功"
			responseData.essay = essay
			responseData.page = page
			res.json(responseData)
		})
	})

})

//拿到首页文章
router.get('/article', (req, res, next) => {
	Essay.find().then((essay) => {
		responseData.code = 0
		responseData.message = "成功"
		responseData.essay = essay
		res.json(responseData)
	})
})


//文章详情页
router.get('/article-des', (req, res, next) => {

	let id = req.query.desid
	Essay.find({ _id: req.query.desid }).then((essay) => {
		responseData.code = 0
		responseData.message = "成功"
		responseData.essay = essay
		res.json(responseData)
	})
})





router.get('/ly', (req, res, next) => {
	let page = Number(req.query.page || 1)
	let limit = 4
	let skip = (page - 1) * limit
	Ly.count().then((count) => {
		//总页数
		let pages = Math.ceil(count / page) //向上取整
		page = Math.min(page, pages)
		page = Math.max(1, page)
		Ly.find().limit(limit).skip(skip).then((ly) => {
			responseData.code = 0,
				responseData.message = "拿到数据成功"
			responseData.ly = ly
			res.json(responseData)
		})

	})


})

router.post('/add/ly', (req, res, next) => {
	let reqLy = req.body.parmas

	let newLy = new Ly({
		lyInfo: reqLy.lyInfo,
		lyDate: reqLy.lyDate
	})
	newLy.save() //没有返回成功的信息

	responseData.code = 0
	responseData.message = "添加成功"
	responseData.ly = reqLy
	res.json(responseData)
})

router.get('/3d/photo', (req, res, next) => {
	res.render('photo')
})
router.get('/userInfo', (req, res, next) => {
	if (typeof req.cookies.userInfo == 'string') {
		req.cookies.userInfo = JSON.parse(req.cookies.userInfo)
	}
	let user = {
		isAdmin: req.cookies.userInfo.isAdmin,
		blogHead: req.cookies.userInfo.blogHead
	}
	res.json(user)
})

router.get('*', function (req, res, next) {
	const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
	res.send(html)

})

module.exports = router

