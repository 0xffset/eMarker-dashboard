const express = require('express')
const orderControl = require('./../controllers/order.controller')

const router = express.Router()

router.route('/api/orders')
    .get(orderControl.list)

router.route('/api/orders/total')
    .get(orderControl.salesTotal)

router.route('/api/orders/chart')
    .get(orderControl.chart)

module.exports = router