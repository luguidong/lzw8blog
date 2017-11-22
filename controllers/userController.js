//判断登录态、登录、注册
let User = require('../models/User');
const crypto = require('crypto');


function hashPass(pass){
    var hash = crypto.createHash('md5');
    hash.update(pass);
    old = hash.digest('hex');
    return old;
}
var login = async(ctx,next)=>{
    var param = ctx.query;
    var userName = param.userName || '',
        password = param.password || '';
    password = hashPass(password);
    console.log(password);
    var tctx = ctx;
    await (async(ctx,next)=>{
        var users =await User.findAll({
            where:{
                name:userName,
                passwd:password
            }
        })
        console.log(users);
        if(users.length > 0){
            tctx.rest({code:0,data:{},msg:'登录成功'});
        }else{
            tctx.rest({code:0,data:{},msg:'登录失败，账号或密码错误'});
        }
    })();
}
var checkLogin = async(ctx,next)=>{
    ctx.rest({code:0,data:{isLogin:0},msg:'登录成功'})
}

module.exports = {
    'GET /api/login' : login,
    'GET /api/checkLogin' : checkLogin
}