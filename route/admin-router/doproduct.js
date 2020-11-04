let formidable = require('formidable');
let productdata = require('../../mongoose/productudb.js');
let path = require('path');
module.exports = (req, res) => {
    // 创建一个表单解析对象
    let form = new formidable.IncomingForm();
    // 配置图片存储文件夹
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 保存上传的文件的后缀
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        // 文件数据
        // console.log(files.img.path.split('public')[1]);
        // // 文本数据
        // console.log(fields)
        let result = await productdata.create({
            productusername: fields.productusername,
            img: files.img.path.split('public')[1],
            productprice: fields.productprice,
            productpost: fields.productpost,
            content: fields.content
        })
        if (result) {
            res.redirect('/admin/productlist')
        }
    })
}