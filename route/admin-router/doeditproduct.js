let formidable = require('formidable');
let productdata = require('../../mongoose/productudb.js');
let path = require('path');
let fs = require('fs');
module.exports = (req, res) => {
    // 创建一个表单解析对象
    let form = new formidable.IncomingForm();
    // 配置图片存储文件夹
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 保存上传的文件的后缀
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        let resultimg = await productdata.findOne({ "_id": req.query.id })
        if (files.img.name) {
            var result = await productdata.updateOne({ "_id": req.query.id }, {
                productusername: fields.productusername,
                img: files.img.path.split('public')[1],
                productprice: fields.productprice,
                productpost: fields.productpost,
                content: fields.content
            })
            fs.unlink(path.join(__dirname, '../', '../', 'public', resultimg.img), (err) => {
                if (err) {
                    console.log('修改图片删除失败')
                } else {
                    console.log('修改图片删除成功')
                }
            })
        } else if (!files.img.name) {
            var result = await productdata.updateOne({ "_id": req.query.id }, {
                productusername: fields.productusername,
                productprice: fields.productprice,
                productpost: fields.productpost,
                content: fields.content
            })
        }
        if (result) {
            res.redirect('/admin/productlist')
        }
    })
}