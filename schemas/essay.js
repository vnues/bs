const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
	 //user 不做user层  我这层是公共的
	 category:Number,//栏目id（导航栏）12345来划分
	 essay:{
	 	title:String,//文章标题
	 	info:String, //文章内容
	 	markdown:String,
	 	date:String
	 }	
})
