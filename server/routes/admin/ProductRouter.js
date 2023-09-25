var express = require('express');
var ProductRouter = express.Router();
const ProductController = require('../../controllers/admin/ProductController')
//涉及到文件上传 普通post不行 需要加上multer中间件
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/'})
ProductRouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)
ProductRouter.post("/adminapi/product/list",upload.single('file'),ProductController.updataList)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)
ProductRouter.get('/adminapi/product/list',ProductController.getList)
ProductRouter.get('/adminapi/product/list/:id',upload.single('file'),ProductController.getList)
module.exports = ProductRouter