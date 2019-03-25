//引入模块
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
//实例Schema
const Schema = mongoose.Schema
//构建Schema结构
const localhostSchema = new Schema({
	host:{
		type: String,
		required: true
	}
})
module.exports = mongoose.model('localhost', localhostSchema)
