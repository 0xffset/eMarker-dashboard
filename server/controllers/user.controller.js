const User = require('./../models/user.model')
const getErrorMessage = require('../helpers/dbErrorParser.js')
const formidable = require('formidable-serverless')
const fs = require('fs')

const list  = async(req, res) => {
    try {
        let listUsers = await User.find().select("name email type_user created status");
        return  res.json(listUsers)
    }
    catch (err) {
        return res.status(401).json({
            error: err
        })
    }
    
}
    
const create = async(req, res) => {
           const user = new User(req.body)
            
        try {
             
            let response = await user.save()
            return res.status(200).json({
                message: "User was created successfully"
            })
        } 
        catch (err) {   
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
   
  }

const userById = async(req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if(!user) {
            return res.status('400').json({
                error: "User not found"
            })
            req.profile = user
            next()
            }

    } catch(err) {
        return res.status('400').json({
            error: "Could not retrive user"
        })
    }
}

module.exports = {
    list,
    userById,
    create
}