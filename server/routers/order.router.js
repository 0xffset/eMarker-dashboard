const express = require('express')
const orderControl = require('./../controllers/order.controller')

const router = express.Router()

router.route('/api/orders')
    .get(orderControl.list)

module.exports = router