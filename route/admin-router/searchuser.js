let dbuser = require("../../mongoose/dbuser")
module.exports = async(req, res) => {


    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 3;
    // 数据库中一共有多少数据
    let total = await dbuser.countDocuments({ "username": new RegExp(req.query.searchname, "gi") });
    // 总共的页数
    let totalpage = Math.ceil(total / size);
    // 每次跳过几条数据
    let startpage = (page - 1) * size

    let result = await dbuser.find({ "username": new RegExp(req.query.searchname, "gi") }).limit(size).skip(startpage)
    console.log(total)
    console.log(totalpage)
    res.render('./admin/searchuser.ejs', {
        list: result,
        page: page,
        size: size,
        total: total,
        totalpage: totalpage,
        username: req.query.searchname
    })
}