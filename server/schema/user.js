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
	}
})
module.exports = mongoose.model('User', userSchema)
