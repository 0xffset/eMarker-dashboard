const {Order} = require('./../models/order.model')
const Product = require('./../models/product.model')
const getErrorMessage = require('../helpers/dbErrorParser.js')
const dateformat = require('dateformat')


const chart = async(req, res) => {
	try {
			let orders = await Order.find().select("products created")
			let parseOrders = Object.values(orders)
			let arrOrders = []
			let ids = []
			let count = 0
			for (let i = 0; i < parseOrders.length; i++) {
				for (product in parseOrders[i]['products']) {
					let idClient = parseOrders[i]['_id']

					let idProduct = parseOrders[i]['products'][product]['product']
					let quantity = 	parseOrders[i]['products'][product]['quantity']
					let status = parseOrders[i]['products'][product]['status']
					let price = await Product.find({"_id" : idProduct}).select("price")
					let amount = (price[0].price * quantity)
					
					if (ids.indexOf(idClient.toString()) !== -1) {
						
						 arrOrders[count]['amount'] =  arrOrders[count]['amount'] + amount
						 count += 1	
						
					}
					 else {
						arrOrders.push({
								id: parseOrders[i]['_id'], // jd order
								amount: amount,
								created_at: dateformat(parseOrders[i]['created'], 'isoDate' )
						})
						ids.push(idClient.toString())	
					}
				}
		 }
        	return  res.json(arrOrders)
	}
	catch (err) {
		error: getErrorMessage(err)
	}
}
const salesTotal = async(req, res) => {
	try {
			let orders = await Order.find().select("products")
			let parseOrders = Object.values(orders)
			let arrOrders = []
			let total = 0
			let ids = []
			let count = 0
			for (let i = 0; i < parseOrders.length; i++) {
				for (product in parseOrders[i]['products']) {
					let idClient = parseOrders[i]['_id']
					let idProduct = parseOrders[i]['products'][product]['product']
					let quantity = 	parseOrders[i]['products'][product]['quantity']
					
					let price = await Product.find({"_id" : idProduct}).select("price")
					let amount = (price[0].price * quantity)
					total = total + amount
					
				}
				
		 }
        	return  res.json(total)
	}
	catch (err) {
		return res.status(400).json({
			error: getErrorMessage(err)
		})
	}
}
const list = async(req, res) => {
	try {
			let orders = await Order.find()
			.limit(5)
			.select("customer_name payment_id customer_email products created")
			let parseOrders = Object.values(orders)
			let arrOrders = []
			let ids = []
			let count = 0
			for (let i = 0; i < parseOrders.length; i++) {
				for (product in parseOrders[i]['products']) {
					let idClient = parseOrders[i]['_id']

					let idProduct = parseOrders[i]['products'][product]['product']
					let quantity = 	parseOrders[i]['products'][product]['quantity']
					let status = parseOrders[i]['products'][product]['status']
					let price = await Product.find({"_id" : idProduct}).select("price")
					let amount = (price[0].price * quantity)
					
					if (ids.indexOf(idClient.toString()) !== -1) {
						
						 arrOrders[count]['amount'] =  arrOrders[count]['amount'] + amount
						 count += 1	
						
					}
					 else {
						arrOrders.push({
								id: parseOrders[i]['_id'], // jd order
								customer_name: parseOrders[i]['customer_name'],
								customer_email: parseOrders[i]['customer_email'],
								amount: amount,
								status: status,
								payment_id: parseOrders[i]['payment_id'],
								created_at: parseOrders[i]['created']
						})
						ids.push(idClient.toString())	
					}
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
	list,
	salesTotal,
	chart
}