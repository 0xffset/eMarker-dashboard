const Product = require('../models/product.model.js')
const fs = require('fs')
const formidable = require('formidable')
const getErrorMessage = require('../helpers/dbErrorParser.js')

const create = (req, res, next) => {
	let dataForm = new formidable.IncomingForm()
	dataForm.keepExtensions= true
	dataForm.parse(req, async(err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Error to load image"
			})
		}
		let product = new Product(fields)
		if(files.image) {
			product.image.data = fs.readFileSync(files.image.path)
			product.image.contentType = files.image.type
		}
		try {
			let result = await product.save()
			return res.status(200).json({
				user: result,
				message: "Product was inserted successfully"
			})
		} catch (err) {
			return res.status(400).json({
				error: getErrorMessage(err)
			})
		}
	})
}
const list  = async(req, res) => {
    try {
        let listProducts = await Product.find().select("name image categories price quantity status");
        return  res.json(listProducts)
    }
    catch (err) {
        return res.status(401).json({
            error: getErrorMessage(err)
        })
    }
    
}
module.exports = {
	create,
	list
}