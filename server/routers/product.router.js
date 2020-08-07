const express = require('express')
const productControl = require('./../controllers/product.controller')
const router = express.Router()

router.route('/api/products')
    .get(productControl.list)
	.post(productControl.create)
router.route('/api/products/:productId')
	.put(productControl.update)
	.get(productControl.listBeforeUpdate)


router.param('productId', productControl.productById)

module.exports = router