
const ProductService = require('../../services/admin/ProductService')
const ProductController = {
    add:async (req,res)=>{
        const cover = req.file?`/productuploads/${req.file.filename}`:""
        const {title,username,introduction,detail} = req.body
        //调用service进行添加
        await  ProductService.add({
            title,
            introduction,
            detail,
            editTime:new Date(),
            username,
            cover
        })
        res.send({
            ActionType:'OK',
        })
    },
    getList:async(req,res)=>{
        const result = await ProductService.getList({_id:req.params.id})
        res.send({
            ActionType:'OK',
            data:result
        })
    },
    delList:async (req,res)=>{
        await ProductService.delList({_id:req.params.id})
        res.send({
            ActionType:'OK',
        })
    },
    updataList:async (req,res)=>{
        const cover = req.file?`/productuploads/${req.file.filename}`:""
        const {title,username,introduction,detail,_id} = req.body
        //调用service进行添加
        await ProductService.updataList({
            title,
            username,
            introduction,
            detail,
            cover,
            editTime:new Date(),
            _id
        })

        res.send({
            ActionType:'OK',
        })
    }
}
module.exports = ProductController