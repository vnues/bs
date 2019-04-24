const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  lyInfo: String,
  lyDate: String,
  lyTime: String
});
