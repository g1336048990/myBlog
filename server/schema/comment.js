const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const commentSchema = new Schema({
	articleid: {
		type: String,
		required: true
	},
	comment: {
		type: Array,
		required: true
	},
	articleName: {
		type: String,
		required: true
	},
})
module.exports = mongoose.model('Comment', commentSchema)
