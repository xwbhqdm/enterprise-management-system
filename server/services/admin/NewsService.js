const NewsModel = require('../../models/NewsModel')
const NewsService = {
    add:async ({title,content,category,ispublish,editTime,cover,username})=>{
       return  NewsModel.create({
           title,content,category,ispublish,editTime,cover,username
       })
    },
    getList:async ({_id})=>{
        return _id?NewsModel.find({_id}):NewsModel.find({})
    },
    publish:async ({_id,ispublish,editTime})=>{
        return NewsModel.updateOne({
            _id,
        },{
            ispublish:Number(ispublish),
            editTime
        })
    },
    delList:async ({_id})=>{
        return NewsModel.deleteOne({
            _id
        })
    },
    updataList:async ({title,content,category,ispublish,editTime,cover,_id})=>{
        if (cover){
            return NewsModel.updateOne({
                _id
            },{
                title,content,category,ispublish,editTime,cover
            })
        }else {
            return NewsModel.updateOne({
                _id
            },{
                title,content,category,ispublish,editTime
            })
        }
    }
}
module.exports = NewsService