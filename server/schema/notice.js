const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const NoticeSchema = new Schema({
	content:{
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
module.exports = mongoose.model('Notice', NoticeSchema)