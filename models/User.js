const mongoose = require('mongoose')

const userSchema=require('../schemas/user')
//Model
//由Schema构造生成的模型，除了Schema定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类
//创建个模型
module.exports=mongoose.model('User',userSchema)
