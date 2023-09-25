var express = require('express');
var WebRouter = express.Router();
const NewsController = require('../../controllers/web/NewsController')
WebRouter.get('/webapi/news/list',NewsController.getList)
WebRouter.get('/webapi/news/list/:id',NewsController.getList)
WebRouter.get('/webapi/news/toplist',NewsController.getTopList)
module.exports = WebRouter