const jsonwebtoken = require('jsonwebtoken')
//设置密钥
const secret = 'kerwin'
const JWT = {
    //封装两个函数
    /*
    * generate:设置token
    * 接收两个参数：参数1：token的值 参数2：token过期时间
    */

    generate(value,expires){
        //设置签名
        //sonwebtoken.sign(token值,密钥,过期时间)
        return  jsonwebtoken.sign(value,secret,{expiresIn: expires})
    },
    //verify:验证token
    verify(token){
        //拿到生成后的token解密
         try {
             return jsonwebtoken.verify(token,secret)
         }catch (e){
             console.log(e,'ee')
             return false
         }
    }
}
module.exports = JWT