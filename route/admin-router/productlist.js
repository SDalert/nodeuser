let productdata = require('../../mongoose/productudb');

module.exports = async(req, res) => {

    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 3;

    // console.log(page * size)
    // console.log(result);
    // 数据库中一共有多少数据
    let total = await productdata.countDocuments({});
    // 总共的页数
    let totalpage = Math.ceil(total / size);
    // 每次跳过几条数据
    let startpage = (page - 1) * size

    let result = await productdata.find().limit(size).skip(startpage);

    res.render('./admin/productlist.ejs', {
        productlist: result,
        page: page,
        size: size,
        total: total,
        totalpage: totalpage
    })

}