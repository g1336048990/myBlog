//引入模块
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
//实例Schema
const Schema = mongoose.Schema
//构建Schema结构
const articleSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	releaseStatus:{
		type: String,
		required: true
	},
	visibility:{
		type: String,
		required: true
	},
	createdTime:{
	    type: String,
	},
	lastTime:{
	    type: String,
	},
})
module.exports = mongoose.model('Article', articleSchema)
