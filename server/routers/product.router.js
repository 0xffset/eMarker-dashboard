const express = require('express')
const productControl = require('./../controllers/product.controller')
const authControl = require('./../controllers/auth.controller')
const router = express.Router()
router.route('/api/products')
    .get(authControl.requiredAuthentication, productControl.list)
	.post(authControl.requiredAuthentication, productControl.create)
router.route('/api/products/:productId')
	.put(authControl.requiredAuthentication, productControl.update)
	.get(authControl.requiredAuthentication, productControl.listBeforeUpdate)


router.param('productId', productControl.productById)

module.exports = router