const NewsModel = require('../../models/NewsModel')
const NewsService = {
    getList:async ({_id})=>{
        return _id?NewsModel.find({_id,ispublish:1})
            :
            NewsModel.find({ispublish:1}).sort({editTime:-1})
    },
    getTopList:async ({limit})=>{
        //Model.limit() 方法指定要查询几条数据
        return NewsModel.find({ispublish:1}).sort({editTime:-1}).limit(limit)
    },
}
module.exports = NewsService