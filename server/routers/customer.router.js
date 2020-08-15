const express = require('express')
const customerControl = require('./../controllers/customer.controller')
const authControl = require('./../controllers/auth.controller')
const router = express.Router()

router.route('/api/customers')
    .get( authControl.requiredAuthentication, customerControl.list)
module.exports = router