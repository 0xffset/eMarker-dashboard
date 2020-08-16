const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const config = require('../config/config')
const crypto = require('crypto')
const User = require('./../models/user.model');

const signin = async(req, res) => {
    try {
        let user = await User.findOne({
            "name": req.body.name
        })
        if (!user) {
            return res.status('401').json({
                error: "User not found"
            })
        }

        if(!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "user or password do not match"
            })
                }
            const token = jwt.sign({
                _id: user._id
            }, config.jwtSecret)

            res.cookie("t", token, {
                expire: new Date() + 9999
            })
        return res.json({
                token,
                user: {_id: user._id, name: user.name, email: user.email, typeUser: user.type_user}
            })

    }

    catch(err) {
        return res.status('401').json({
            error: err
        })
    }
}




const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "sign out"
    })
}

const requiredAuthentication = (req, res, next) => {
    const token = req.headers['access-token']
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status('401').json({
                    error: "Token invalid!"
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status('401').json({
            error: "UnauthorizedError. "
        })
    }
}

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile  && req.profile._id
    if(!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}


module.exports = {
    signin,
    signout,
    hasAuthorization,
    requiredAuthentication

}
