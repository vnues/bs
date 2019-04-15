const mongoose = require('mongoose')
//一般我们不直接用MongoDB的函数来操作MongoDB数据库 Mongose就是nodejs一套操作MongoDB数据库的接口

//Schema
//一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力.可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架

//定义用户的表结构
//没有声明就是undefined
module.exports=new mongoose.Schema({	
	username:String,
	password:String,
	isAdmin:{
		type:Boolean,
		default:false
	},
	blogHead:String  //头像  游客不能回复评论  没有游客评论  默认是0.jpg
})
