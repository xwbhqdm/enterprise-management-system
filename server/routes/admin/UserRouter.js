var express = require('express');
var UserRouter = express.Router();
var UserController = require('../../controllers/admin/UserController')
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/'})
/* GET users listing. */
UserRouter.post("/adminapi/user/login",UserController.login)
UserRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)
UserRouter.post("/adminapi/user/add",upload.single('file'),UserController.add)
UserRouter.get("/adminapi/user/list",UserController.getList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)
UserRouter.put("/adminapi/user/list/:id",UserController.putList)
module.exports = UserRouter;
