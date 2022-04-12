const db = require('../db/connection')

exports.getAllUsers = (req,res) => {
    return db.query(`SELECT * FROM users`)
    .then(resp => resp.rows)
}