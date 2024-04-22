const express = require('express')
const Book = require('../model/book')
const FileBook = require('../model/fileBook')

const read = async (req, res) => {
    try {
        const books = await Book.find({})
        res.json({
            success: true,
            books
        })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    try {
        const { title, author, type, introduction, image, price, url } = req.body
        const newBook = new Book({ title, author, type, introduction, image, price })
        await newBook.save()
        const newFileBook = new FileBook({ url, title: title, book: newBook._id })
        await newFileBook.save()
        res.json({
            success: true,
            book: newBook,
            fileBook: newFileBook
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = { read, create }
