const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserType = {
    username:String,
    password:String,
    gender:Number,//性别 0,1
    introduction:String, //简介
    avatar:String,
    role:Number
}
//user模型 ===> users集合
const UserModel= mongoose.model("user",new Schema(UserType))
module.exports = UserModel