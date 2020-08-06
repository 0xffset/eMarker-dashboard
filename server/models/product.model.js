const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Product name required',
		unique: 'Already exists this product'
	},
	image: {
		data: Buffer,
		contentType: String
	},
	description: {
		type: String,
		required: 'Description product required'
	},
	categories: {
		type: String,
		required: 'Caregories product required'
	},
	quantity:{
	 type: Number,
	 required: 'quantity product required'
	},
	tax: {
		type: Number,
		required: 'Tax product is required'
	},
	price: {
		type: Number,
		required: 'Price product is required'
	},
	status: {
		type: String,
		default: "Enable"
	},
	updated: Date,
	created: {
		type: Date,
		default: Date.now
	},
	sku: {
		type: String,
		required: 'SKU code product required'
	},
	width: {
		type: Number
	},
	height: {
		type: Number
	},
	depth: {
		type: Number
	},
	weight: {
		type: Number
	}
})


 module.exports = mongoose.model('Product', ProductSchema)