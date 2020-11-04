let productdata = require('../../mongoose/productudb');
module.exports = async(req, res) => {
    // console.log(req.query)
    let result = await productdata.findOne({ '_id': req.query.id })
        // console.log(result)
    res.render('./admin/editproduct.ejs', {
        list: result
    })
}