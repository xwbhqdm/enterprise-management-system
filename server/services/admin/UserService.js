const UserModel = require('../../models/UserModel')
const UserService={
    login:async ({username,password})=>{
        return UserModel.find({
            username,
            password
        })
    },
    upload:async ({_id,username,introduction,avatar,gender})=>{
        //updateOne 数据库更新字段
        if (avatar){
            return UserModel.updateOne({
                _id
            },{
                username,introduction,avatar,gender
            })
        }else {
            return UserModel.updateOne({
                _id
            },{
                username,introduction,gender
            })
        }
    },
    add:async ({password,role,username,introduction,avatar,gender})=>{
        return UserModel.create({
            username,password,role,introduction,gender,avatar
        })
    },
    getList:async ({id})=>{
        return id?UserModel.find({_id:id},['username','role','password','_id',"introduction"]):UserModel.find({},['username','role','introduction','gender','avatar'])
    },
    delList:async ({_id})=>{
        return UserModel.deleteOne({_id})
    },
    putList:async (body)=>{
        return UserModel.updateOne({_id:body._id},body)
    }
}
module.exports = UserService