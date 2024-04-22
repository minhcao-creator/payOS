const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		unique: true,
		required: true
	},
	books: [{
		type: Schema.Types.ObjectId,
		ref: 'books'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('users', UserSchema)