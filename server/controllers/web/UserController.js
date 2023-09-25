const UserService = require('../../services/web/webUserService')
const JWT =require('../../util/JWT')
const UserController={
    login:async (req,res)=>{
        //调用service中的login方法操作数据库拿到返回的数据
        var result = await UserService.login(req.body)
        //如果数据库没有返回数据就说明账号或密码不匹配
        if (result.length === 0){
            //通过res对象中的send方法返回状态码和状态信息,返回到前端
            res.send({
                code:'-1',
                error:'用户名密码不匹配'
            })
        }else {
            //生成token
            // JWT.generate()
            //如果用户名密码匹配上了就通过封装好的JWT方法中的generate生成token
            const token =JWT.generate({
                _id:result[0]._id,
                username:result[0].username,
            },'1d')
            //把Authorization字段设置成token
            res.header('Authorization',token)
            //返回给前端状态码和数据
            res.send({
                ActionType:'OK',
                data:{
                    _id:result[0]._id,
                    username:result[0].username,
                    avatar:result[0].avatar,
                }
            })
        }
    },
    add:async (req,res)=>{
        const {username,gender,introduction,role,password} = req.body
        const token = req.headers['authorization'].split(" ")[1]
        const avatar =req.file ? `/avataruploads/${req.file.filename}`: ""
        let payload = JWT.verify(token)
        //调用service 模块更新数据
        UserService.add({
            _id:payload._id,
            username,
            avatar,
            password
        })

        res.send({
            ActionType:'OK',
        })
    },
    getList:async (req,res)=>{
        const id = req.params.id
        const reslut = await UserService.getList({id})
        res.send({
            ActionType:'OK',
            data:reslut
        })
    },
    delList:async (req,res)=>{
        await UserService.delList({_id:req.params.id})
        res.send({
            ActionType:'OK',
        })
    },
    putList:async (req,res)=>{
        await UserService.putList(req.body)
        res.send({
            ActionType:'OK',
        })
    }
}
module.exports = UserController