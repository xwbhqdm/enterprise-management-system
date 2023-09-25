var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter')
const NewsRouter = require('./routes/admin/NewsRouter')
const ProductRouter = require('./routes/admin/ProductRouter')
const webNewsRouter = require('./routes/web/NewsRouter')
const webProductRouter = require('./routes/web/ProductRouter')
const webUserRouer = require('./routes/web/UserRouter')
var JWT = require('./util/JWT')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
//注册企业官网产品路由
app.use(webProductRouter)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req,res,next)=>{
  if (req.url === '/adminapi/user/login' || req.url === '/webapi/user/login'){
    next()
    return
  }
  const token = req.headers['authorization'].split(" ")[1]
  //如果拿到token校验token是否有效
  if (token){
    let payload = JWT.verify(token)
    if (payload){
      //如果有效在用户每次刷新时都会返回一个新的token
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },'1d')
      res.header("Authorization",newToken)
      next()
    }else {
      res.status(401).send({
        errorCode:'-1',
        errorMessage:'Token失效'
      })
    }
  }
})
// 注册用户路由
app.use(UserRouter)
//注册新闻路由
app.use(NewsRouter)
//注册产品路由
app.use(ProductRouter)
//注册企业官网用户路由
app.use(webUserRouer)
//注册企业官网新闻页路由
app.use(webNewsRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
* /adminapi/* 后台系统接口
* /webapi/* 企业官网接口
* */
module.exports = app;
