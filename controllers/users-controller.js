const { getAllUsers } = require('../models/users')

exports.getAllUsers = (req,res) => {
    return getAllUsers().then(data => {
        res.send({users: data})
})
}
