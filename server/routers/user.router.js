const express = require('express')
const userControl = require('./../controllers/user.controller')
const authControl = require('./../controllers/auth.controller')
const router = express.Router()

router.route('/api/users')
    .get(authControl.requiredAuthentication, userControl.list)
    .post(authControl.requiredAuthentication,userControl.create)
router.route('/api/users/:userId')
	.put(authControl.requiredAuthentication,authControl.hasAuthorization, userControl.update)
	.delete(authControl.requiredAuthentication, authControl.hasAuthorization, userControl.remove)

router.param('userId', userControl.userById)

module.exports = router