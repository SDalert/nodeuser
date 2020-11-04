let express = require('express');
const md5 = require('md5');
const { replaceOne } = require('../mongoose/dbuser');
let router = express.Router();
// 数据库模块
let dbuser = require('../mongoose/dbuser');
// 登录页面路由
router.get('/login', require('./admin-router/login.js'));
// 添加商品页面路由
router.get('/addproduct', require('./admin-router/addproduct.js'));
// 商品列表页面路由
router.get('/productlist', require('./admin-router/productlist.js'));
// 修改商品页面路由
router.get('/editproduct', require('./admin-router/editproduct.js'));
// 添加用户页面路由
router.get('/adduser', require('./admin-router/adduser.js'));
// 用户列表页面路由
router.get('/userlist', require('./admin-router/userlist.js'));
// 修改用户页面路由
router.get('/edituser', require('./admin-router/edituser.js'));
// 添加用户到数据库
router.post('/douserdb', async(req, res) => {
    let obj = {
        username: req.body.username,
        userpassword: md5(req.body.userpassword),
        usersex: req.body.usersex,
        userage: req.body.userage,
        useradress: req.body.useradress
    }
    let result = await dbuser.create(obj)
    res.redirect('/admin/userlist')
});
// 删除数据库用户的数据
router.get('/removeuser', async(req, res) => {
    // console.log(req.query)
    let result = await dbuser.findOneAndDelete({ '_id': req.query.id });
    res.redirect('/admin/userlist')
});
// 将数据库中的数据修改
router.post('/doedituer', async(req, res) => {
    // console.log(req.query.id);
    let result = await dbuser.updateOne({ "_id": req.query.id }, req.body);
    res.redirect('/admin/userlist')
});
//搜索用户
router.get('/searchuser', require('./admin-router/searchuser.js'));
// 点击登录页面路由
router.post('/dologin', require('./admin-router/dologin'));
// 退出登录
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login')
});
// 将商品添加到数据库
router.post('/doproduct', require('./admin-router/doproduct.js'));
// 删除商品数据
router.get('/removeproduct', require('./admin-router/removeproduct'));
// 将商品数据在数据库中修改
router.post('/doeditproduct', require('./admin-router/doeditproduct'));
// 搜索商品
router.get('/searchproduct', require('./admin-router/searchproduct.js'));
module.exports = router;