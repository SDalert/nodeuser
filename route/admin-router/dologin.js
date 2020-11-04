const md5 = require('md5')
let dbuser = require('../../mongoose/dbuser.js')
module.exports = async(req, res) => {
    // console.log(req.body)
    // console.log(req.body.loginuser)
    // console.log(req.body.loginpassword)
    let userinfo = {
        username: req.body.loginuser,
        userpassword: md5(req.body.loginpassword)
    }
    let resultuser = await dbuser.findOne({ 'username': req.body.loginuser })
    let resultpsw = await dbuser.findOne({ 'userpassword': md5(req.body.loginpassword) })
    if (!resultuser) {
        res.send('<script>alert("该用户不存在");location.href="/admin/login"</script>')
    } else if (!resultpsw) {
        res.send('<script>alert("密码错误");location.href="/admin/login"</script>')
    } else {
        let result = await dbuser.findOne(userinfo)
        if (result) {
            req.app.locals.username = req.body.loginuser;
            req.session.username = req.body.loginuser;
            res.redirect("/admin/userlist");
        }
    }
}