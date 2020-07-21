const express = require('express')
const userControl = require('./../controllers/user.controller')

const router = express.Router()

router.route('/user/list')
    .get(userControl.list)

module.exports = router