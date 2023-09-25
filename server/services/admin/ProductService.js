const ProductModel = require('../../models/ProductModel')
const ProductService = {
    add:async ({title,editTime,cover,username,introduction,detail})=>{
        return  ProductModel.create({
            title,detail,introduction,editTime,cover,username
        })
    },
    getList:async ({_id})=>{
        return _id?ProductModel.find({_id}):ProductModel.find({})
    },
    delList:async ({_id})=>{
        return ProductModel.deleteOne({
            _id
        })
    },
    updataList:async ({title,introduction,detail,_id,cover,editTime})=>{
        if (cover){
            return ProductModel.updateOne({
                _id
            },{
                title,introduction,detail,editTime,cover
            })
        }else {
            return ProductModel.updateOne({
                _id
            },{
                title,introduction,detail,editTime
            })
        }
    }
}
module.exports = ProductService