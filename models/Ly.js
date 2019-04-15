//model才能操作数据表schema  像mutations和state


const mongoose = require('mongoose')

const lySchema = require('../schemas/ly')



module.exports = mongoose.model('Ly',lySchema)
