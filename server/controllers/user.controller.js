const User = require('./../models/user.model')
const getErrorMessage = require('../helpers/dbErrorParser.js')
const formidable = require('formidable-serverless')
const fs = require('fs')
const extend = require('lodash/extend')

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

const update = async(req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)

        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json({
            user: user,
            message: "The user was updated successfully"
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}
const remove = async(req, res) => {
        
    try {
        let user = req.profile
        let delUser = await user.remove()
        delUser.hashed_password = undefined
        delUser.salt = undefined
        res.json({
            user: delUser,
            message: `${delUser.name} was deleted successfully`
        })            
        }
    catch (err) {
        return res.status(400).json({
            err: err
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
        } 
            req.profile = user
            next()       

            

    } catch(err) {
        return res.status('400').json({
            error: "Could not retrive user"
        })
    }
}

module.exports = {
    update,
    remove,
    list,
    userById,
    create
}