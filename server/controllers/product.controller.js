const Product = require('../models/product.model.js')
const fs = require('fs')
const formidable = require('formidable')
const getErrorMessage = require('../helpers/dbErrorParser.js')
const extend = require('lodash/extend')
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

const update = (req, res, next) => {
    let dataForm = new formidable.IncomingForm()
    dataForm.keepExtensions= true
    dataForm.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Error to load image"
            })
        }
        let product = req.product
        product = extend(product, fields)
        product.updated = Date.now()
        if(files.image) {
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
        }
        try {
            let result = await product.save()
            return res.status(200).json({
                user: result,
                message: `${result.name} was updated successfully`
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
const listBeforeUpdate  = async(req, res) => {
    try {
        let listProducts = await Product.find(req.product._id).select("name image description  tax sku  categories price quantity status weidth  height depth weight");
        return res.json({data: listProducts})
    }
    catch (err) {
        return res.status(401).json({
            error: getErrorMessage(err)
        })
    }
    
}

const productById = async(req, res, next, id) => {

    try {
        let product = await Product.findById(id)

        if(!product) {
            return res.status('400').json({
                error: "Product not found"
            })
        } 
            req.product = product
            next()       

            

    } catch(err) {
        return res.status('400').json({
            error: "Could not retrive product"
        })
    }
}
module.exports = {
	create,
	list,
	listBeforeUpdate,
	productById,
    update
}