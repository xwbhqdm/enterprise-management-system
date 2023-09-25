
const NewsService = require('../../services/web/NewsService')
const NewsController = {
    getList:async(req,res)=>{
        const result = await NewsService.getList({_id:req.params.id})
        console.log(result)
        res.send({
            ActionType:'OK',
            data:result
        })
    },
    getTopList:async(req,res)=>{
        //req.query拿到前台通过路由传过来的参数
        const result = await NewsService.getTopList({limit:req.query.limit})
        res.send({
            ActionType:'OK',
            data:result
        })
    },
    // publish:async (req,res)=>{
    //     await NewsService.publish({
    //         ...req.body,
    //         editTime:new Date()
    //     })
    //     res.send({
    //         ActionType:'OK',
    //     })
    // },
    // delList:async (req,res)=>{
    //     await NewsService.delList({_id:req.params.id})
    //     res.send({
    //         ActionType:'OK',
    //     })
    // },
    // updataList:async  (req,res)=>{
    //     await NewsService.updataList(req.body)
    //     const cover = req.file?`/newsuploads/${req.file.filename}`:""
    //     const {title,content,category,ispublish} = req.body
    //     //调用service进行添加
    //     await NewsService.updataList({
    //         title,
    //         content,
    //         category:Number(category),
    //         ispublish:Number(ispublish),
    //         cover,
    //         editTime:new Date()
    //     })
    //
    //     res.send({
    //         ActionType:'OK',
    //     })
    // }
}
module.exports = NewsController