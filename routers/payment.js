const express = require('express');
const payOS = require('../utils/payos');
const router = express.Router()
const FileBook = require('../model/fileBook')
const Order = require('../model/order')
const verifyToken = require('../middleware/auth')

// router.use('/payment', require('../controller/payment'));
// router.use('/order', require('../controller/order'));




const findFiles = async (books) => {
    if (books.length == 0) return []
    const book = books.shift().toString()
    const file = await FileBook.findOne({ book })
    const files = await findFiles(books)
    return [...files, file]
}

router.post('/result', verifyToken, async (req, res) => {
    // console.log(req.body)
    try {
        const response = await payOS.getPaymentLinkInformation(req.body.orderId)
        // console.log(response.status)
        if (response.status == "PAID") {
            const order = await Order.findOne({ orderId: req.body.orderId })
            // console.log(order.books)
            let files = []
            const books = order.books

            const datafiles = await findFiles(books)

            res.json({
                success: true,
                datafiles
            })
        }
        else {
            res.json({
                success: false,
            })
        }
    } catch (error) {
        console.error(error);
        res.send('Something went error');
    }
})

router.post('/', verifyToken, async (req, res) => {
    try {
        const { orderCode, amount, description, returnUrl, cancelUrl, orderBooks } = req.body
        let booksId = []
        orderBooks.map((book) => {
            booksId.push(book.id)
        })
        const paymentLinkResponse = await payOS.createPaymentLink({ orderCode, amount, description, returnUrl, cancelUrl });
        const newOrder = new Order({ orderId: paymentLinkResponse.paymentLinkId, books: booksId, user: req.userId })
        await newOrder.save()
        res.json({
            success: true,
            checkout: paymentLinkResponse
        })
        // res.redirect(paymentLinkResponse.checkoutUrl);
    } catch (error) {
        console.error(error);
        res.send('Something went error');
    }
});

module.exports = router
