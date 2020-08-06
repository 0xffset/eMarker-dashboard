const express = require('express')
const productControl = require('./../controllers/product.controller')
const router = express.Router()

router.route('/api/products')
    .get(productControl.list)
	.post(productControl.create)
module.exports = router