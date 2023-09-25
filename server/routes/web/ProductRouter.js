var express = require('express');
var ProductRouter = express.Router();
const productController = require('../../controllers/web/productController')
ProductRouter.get('/webapi/product/list',productController.getList)
module.exports = ProductRouter