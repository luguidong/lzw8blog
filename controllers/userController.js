//判断登录态、登录、注册
let User = require('../models/User');
const crypto = require('crypto');

const hash = crypto.createHash('md5');

var login = async(ctx,next)=>{
    var param = ctx.request.body;
    var userName = param.userName || '',
        password = param.password || '';
    password = hash.digest(hash.update(password));
    var tctx = ctx;
    (async(ctx,next)=>{
        var users = await User.findAll({
            where:{
                name:userName,
                passwd:password
            }
        })
        tctx.response.type = 'application/json';
        if(users.length > 0){
            tctx.response.body = {code:0,data:{},msg:'登录成功'};
        }else{
            tctx.response.body = {code:0,data:{},msg:'登录失败，账号或密码错误'};
        }
    })().then((users)=>{
        console.log(JSON.stringify(users));
    });
    
}

module.exports = {
    'GET /api/login' : login
}