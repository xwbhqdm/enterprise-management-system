const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String,
    editTime:Date,
    username:String
}
//user模型 ===> users集合
const ProductModel= mongoose.model("product",new Schema(ProductType))
module.exports = ProductModel