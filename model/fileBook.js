const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FileBookSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'books'
    }
})

module.exports = mongoose.model('fileBooks', FileBookSchema)