const express = require('express')
const router = express.Router()

const Book = require('../controller/book')

router.get('/', Book.read)
router.post('/', Book.create)

module.exports = router