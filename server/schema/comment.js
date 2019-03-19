const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const commentSchema = new Schema({
	articleId:{
		type: String,
		required: true
	},
	comment:{
		type: Array,
		required: true
	},
})
module.exports = mongoose.model('Article', articleSchema)
