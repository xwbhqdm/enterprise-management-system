const UserModel = require('../../models/WebUserModel')
const UserService={
    login:async ({username,password})=>{
        return UserModel.find({
            username,
            password
        })
    },
    // upload:async ({_id,username,introduction,avatar,gender})=>{
    //     //updateOne 数据库更新字段
    //     if (avatar){
    //         return UserModel.updateOne({
    //             _id
    //         },{
    //             username,introduction,avatar,gender
    //         })
    //     }else {
    //         return UserModel.updateOne({
    //             _id
    //         },{
    //             username,introduction,gender
    //         })
    //     }
    // },
    add:async ({password,username,avatar})=>{
        return UserModel.create({
            username,password,avatar
        })
    },
    getList:async ({id})=>{
        return id?UserModel.find({_id:id},['username','role','password','_id',"introduction"]):UserModel.find({},['username','role','introduction','gender','avatar'])
    },
    delList:async ({_id})=>{
        return UserModel.deleteOne({_id})
    },
}
module.exports = UserService