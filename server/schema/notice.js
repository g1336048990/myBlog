const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const NoticeSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	content:{
		type: String,
		required: true
	},
	keywords:{
		type: String,
		required: true
	},
	describe:{
		type: String,
		required: true
	},
	releaseStatus:{
		type: String,
		required: true
	},
	visibility:{
		type: Array,
		required: true
	},
	createdTime:{
	    type: String,
	},
	lastTime:{
	    type: String,
	},
})
module.exports = mongoose.model('Notice', NoticeSchema)