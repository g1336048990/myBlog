const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/myblog', { useNewUrlParser: true })
const Schema = mongoose.Schema
const imageSchema = new Schema({
	imageName: {
		type: String,
		required: true
	},
	filePath: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
	createdTime: {
		type: String,
		require: true
	}
})
module.exports = mongoose.model('image', imageSchema)
