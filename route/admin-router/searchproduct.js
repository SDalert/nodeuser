let productdata = require('../../mongoose/productudb');

module.exports = async(req, res) => {

    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 3;
    // console.log(page * size)
    // console.log(result);
    // 数据库中一共有多少数据
    let minprice = req.query.minprice || 0;
    let maxprice = req.query.maxprice || 100000000;
    let total = await productdata.countDocuments({
        'productusername': new RegExp(req.query.productname, "gi"),
        'productprice': { $gt: minprice, $lt: maxprice }
    });
    // // 总共的页数
    let totalpage = Math.ceil(total / size);
    // console.log(total)
    // console.log(size)
    // console.log(totalpage)
    // // 每次跳过几条数据
    let startpage = (page - 1) * size


    let result = await productdata.find({
        'productusername': new RegExp(req.query.productname, "gi"),
        'productprice': { $gt: minprice, $lt: maxprice }
    }).limit(size).skip(startpage);

    res.render('./admin/searchproduct.ejs', {
        productlist: result,
        page: page,
        size: size,
        total: total,
        totalpage: totalpage,
        name: req.query.productname
    })

}