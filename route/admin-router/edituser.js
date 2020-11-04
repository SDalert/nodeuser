const dbuser = require("../../mongoose/dbuser")

module.exports = async(req, res) => {
    // console.log(req.query.id)
    let result = await dbuser.findOne({ '_id': req.query.id })
    res.render('./admin/edituser.ejs', {
        list: result
    })
}