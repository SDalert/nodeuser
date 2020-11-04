let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user-data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('数据库连接成功')
}).catch(err => {
    console.log('数据库连接失败')
})