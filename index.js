const express = require('express')
const cors = require('cors')

const ConnectDB = require('./config/connectDB')
ConnectDB()

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(cors())
app.use(express.urlencoded({ extended: false }));

const bookRouter = require('./routers/book')
const paymentRouter = require('./routers/payment')
const authRouter = require('./routers/auth')

app.use('/books', bookRouter)
app.use('/payment', paymentRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(4004)