const express = require('express')
const authControl = require('./../controllers/auth.controller')

const router = express.Router()

router.route('/auth/signin')
    .post(authControl.signin)

module.exports = router