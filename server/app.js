/*
 *模块引入
 */
var express = require('express')
//异地源访问
// var cors = require('cors')
//反向代理
// var proxy = require('http-proxy-middleware')
//引入路由
var router = require('./router')
var bodyParser = require('body-parser')
/*
 *插件使用
 */
//构建框架
var app = express()

//配置跨域请求
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
　next()　
})
//配置body-parser解析post,放置在路由前
app.use(bodyParser.urlencoded({ entended: false}))
app.use(bodyParser.json())
//开放静态资源访问
// app.use("/static", express.static(__dirname))
app.use(express.static(__dirname + '\\images'))
app.use(express.static(__dirname + '\\videos'))
//挂载路由
app.use(router)


app.listen(8889, function(){
	console.log(`Server is running at date ${new Date()} and port is 8889....................`)
})