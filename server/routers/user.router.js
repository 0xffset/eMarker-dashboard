const express = require('express')
const userControl = require('./../controllers/user.controller')
const authControl = require('./../controllers/auth.controller')

const router = express.Router()

router.route('/api/users')
    .get(userControl.list)
    .post(userControl.create)
router.route('/api/users/:userId')
	.put(userControl.list)
	.delete( authControl.hasAuthorization, userControl.remove)

router.param('userId', userControl.userById)

module.exports = router