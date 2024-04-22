require('dotenv').config()
const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3ehn9dq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = ConnectDB
