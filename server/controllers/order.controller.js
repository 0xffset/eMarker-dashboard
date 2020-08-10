const {Order} = require('./../models/order.model')
const Product = require('./../models/product.model')
const getErrorMessage = require('../helpers/dbErrorParser.js')



const list = async(req, res) => {
	try {
			let orders = await Order.find()
			.limit(5)
			.select("customer_name payment_id customer_email products created")
			let parseOrders = Object.values(orders)
			let arrOrders = []
			for (let i = 0; i < parseOrders.length; i++) {
				for (product in parseOrders[i]['products']) {
					let idProduct = parseOrders[i]['products'][product]['product']
					let quantity = 	parseOrders[i]['products'][product]['quantity']
					let status = parseOrders[i]['products'][product]['status']
					let price = await Product.find({"_id" : idProduct}).limit(5).select("price status")
					let amount = (price[0].price * quantity)
					arrOrders.push({
						_id: parseOrders[i]['_id'], // id customer
						customer_name: parseOrders[i]['customer_name'],
						customer_email: parseOrders[i]['customer_email'],
						amount: amount,
						status: status,
						payment_id: parseOrders[i]['payment_id'],
						created_at: parseOrders[i]['created']
					})
				}
				
			}
        	return  res.json(arrOrders)
	}
	catch (err) {
		return res.status(400).json({
			error: getErrorMessage(err)
		})
	}
}


module.exports = {
	list
}