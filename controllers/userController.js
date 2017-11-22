//判断登录态、登录、注册
let User = require('../models/User');
const crypto = require('crypto');


function hashPass(pass){
    var hash = crypto.createHash('md5');
    var old = hash.update(pass);
    old = hash.digest(old);
    return old;
}
var login = (ctx,next)=>{
    var param = ctx.query;
    var userName = param.userName || '',
        password = param.password || '';
    password = hashPass(password);
    var tctx = ctx;
    (async(ctx,next)=>{
        var users =await User.findAll({
            where:{
                name:userName
            }
        })
        console.log(users);
        tctx.response.type = 'application/json';
        if(users.length > 0){
            tctx.response.body = {code:0,data:{},msg:'登录成功'};
        }else{
            tctx.response.body = {code:0,data:{},msg:'登录失败，账号或密码错误'};
        }
    })();
}

module.exports = {
    'GET /api/login' : login
}