const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const loginLogSchema = new Schema({
	user_id: {
		type: String,
		required: true
	},
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
	host: {
		type: String,
		required: true
	},
	createdTime: {
		type: Date,
		default: Date.now()
	}
})
module.exports = mongoose.model('LoginLog', loginLogSchema)
