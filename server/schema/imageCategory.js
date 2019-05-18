//引入模块
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
//实例Schema
const Schema = mongoose.Schema
//构建Schema结构
const imageCategorySchema = new Schema({
	imageCategory:{
		type: String,
		required: true
	}
})
module.exports = mongoose.model('imageCategory', imageCategorySchema)