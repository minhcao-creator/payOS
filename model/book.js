const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Novel', 'Comic', 'Magazine', 'Autobiography', 'Thriller', 'Science fiction', 'Self-help', 'Memoir', 'Orther']
    },
    introduction: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('books', BookSchema)