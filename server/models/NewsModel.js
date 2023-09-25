const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NewsType = {
    title:String,
    content:String,
    category:Number,//类别 1,2,3
    cover:String, //封面
    ispublish:Number,//未发布 已发布
    editTime:Date,
    username:String
}
//user模型 ===> users集合
const NewsModel= mongoose.model("news",new Schema(NewsType))
module.exports = NewsModel