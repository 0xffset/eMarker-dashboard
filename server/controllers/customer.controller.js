const Customer = require('./../models/customer.model')
const getErrorMessage = require('../helpers/dbErrorParser.js')


const list  = async(req, res) => {
    try {
        let listCustomer = await Customer.find().select("name email created");
        return  res.json(listCustomer)
    }
    catch (err) {
        return res.status(401).json({
            error: err
        })
    }
    
}

module.exports = {
	list
}
