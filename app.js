let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let app = new express();
let session = require('express-session');


// ejs配置
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//配置session
app.use(session({
    secret: 'fdsadsjkfjalwopeworaoe', //任意传一个字符串，生成session的签名
    resave: false, //强制保存session,默认是true不保存，设置成false强制保存
    saveUninitialized: true, //强制将未初始化的session保存
    cookie: {
        // secure: true  指的是https协议
        maxAge: 30 * 60 * 1000 //设置过期时间
    },
    rolling: true //强制将cookie的过期时间重置
}));

// bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    if (req.url != '/admin/login' && req.url != '/admin/dologin' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        next()
    }
})

// 引入自定义路由模块
let admin = require('./route/admin.js')
app.use('/admin', admin)



app.listen(3000, () => {
    console.log('3000running');
})