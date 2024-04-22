const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrderSchema = new Schema({
    orderId: {
        type: String,
        require: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'books'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('orders', OrderSchema)