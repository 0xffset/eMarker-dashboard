const User = require('./../models/user.model')

const list  = async(req, res) => {
    try {
        let listUsers = await User.find().select("name email type_user");
        return  res.json(listUsers)
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