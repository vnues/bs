const mongoose = require('mongoose')

const essaySchema = require('../schemas/essay')


module.exports = mongoose.model('Essay',essaySchema)
