const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	telephone: {
		type: Number,
		required: true
	},
	passPwd: {
		type: String,
		required: true
	},
	createdTime: {
		type: Date,
		default: Date.now()
	},
	imageName: {
		type: String,
		default: 'icon.png'
	},
	filePath: {
		type: String,
		default: 'head_pic'
	}
})
module.exports = mongoose.model('User', userSchema)
