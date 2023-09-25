var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/admin/NewsController')
//涉及到文件上传 普通post不行 需要加上multer中间件
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/'})
NewsRouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)
NewsRouter.get('/adminapi/news/list',NewsController.getList)
NewsRouter.get('/adminapi/news/list/:id',NewsController.getList)
NewsRouter.put('/adminapi/news/publish',NewsController.publish)
NewsRouter.delete(`/adminapi/news/list/:id`,upload.single('file'),NewsController.delList)
NewsRouter.post('/adminapi/news/list',upload.single('file'),NewsController.updataList)
module.exports = NewsRouter