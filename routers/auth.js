const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Auth = require('../controller/auth')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, Auth.read)

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', Auth.register)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', Auth.login)

module.exports = router