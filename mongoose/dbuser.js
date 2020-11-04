let mongoose = require('mongoose');
require('./publicdb.js')
    //创建用户集合规则
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: 2,
        maxlength: 18,
        trim: true
    },
    userpassword: {
        type: String,
        required: [true, '密码不能为空'],
        minlength: 6,
        maxlength: 999999,
        trim: true
    },
    usersex: {
        type: String,
        require: [true, '性别不能为空'],
        enum: {
            values: ['男', '女', '保密']
        },
        message: '选择正确的性别'
    },
    userage: {
        type: Number,
        min: 1,
        max: 99
    },
    useradress: {
        type: String,
    }
})

let dbuser = mongoose.model('dbuser', UserSchema)
module.exports = dbuser;