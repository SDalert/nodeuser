let mongoose = require('mongoose');
require('./publicdb.js')
    //创建用户集合规则
let ProductSchema = new mongoose.Schema({
    productusername: {
        type: String,
        required: [true, '用户名不能为空'],
    },
    img: {
        type: String
    },
    productprice: {
        type: Number
    },
    productpost: {
        type: String
    },
    content: {
        type: String
    }

})

let productdata = mongoose.model('productdata', ProductSchema)
module.exports = productdata;