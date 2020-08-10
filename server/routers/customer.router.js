const express = require('express')
const customerControl = require('./../controllers/customer.controller')
const router = express.Router()

router.route('/api/customers')
    .get(customerControl.list)
module.exports = router