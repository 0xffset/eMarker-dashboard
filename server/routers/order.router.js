const express = require('express')
const orderControl = require('./../controllers/order.controller')
const authControl = require('./../controllers/auth.controller')

const router = express.Router()

router.route('/api/orders')
    .get(authControl.requiredAuthentication, orderControl.list)

router.route('/api/orders/total')
    .get(authControl.requiredAuthentication,orderControl.salesTotal)

router.route('/api/orders/chart')
    .get(authControl.requiredAuthentication, orderControl.chart)

module.exports = router