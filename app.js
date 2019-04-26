const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const fs = require("fs");
var logger = require("morgan");

//加载数据库
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //设置模板引擎
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(path.resolve(__dirname, "./dist")));
app.use("/public", express.static(path.resolve(__dirname + "/public")));
app.use("/uploads", express.static(path.resolve(__dirname + "/uploads")));

//打印属性
// app.use(logger('dev'));

app.use("/api", require("./routers/api"));
app.use("/admin", require("./routers/admin"));
app.use("/", require("./routers/main"));
global.db = mongoose.connect("mongodb://localhost:27017/bs", err => {
  if (err) {
    console.log("数据库连接失败");
  } else {
    console.log("数据库连接成功");
  }
});
app.listen("3100", () => {
  console.log("启动成功");
});
module.exports = app;
