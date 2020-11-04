let productdata = require('../../mongoose/productudb.js');
let fs = require('fs');
let path = require('path')
const { pathToFileURL } = require('url');
module.exports = async(req, res) => {
    let result = await productdata.findOneAndDelete({ '_id': req.query.id });
    fs.unlink(path.join(__dirname, '../', '../', 'public', result.img), (err) => {
        if (err) {
            console.log('删除图片删除失败')
        } else {
            console.log('删除图片删除成功')
        }
    })
    if (result) {
        res.redirect('/admin/productlist')
    }
}