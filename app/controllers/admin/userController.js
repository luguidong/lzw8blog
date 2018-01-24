//新增用户，权限管理
let User = require('../../models/User');
const crypto = require('crypto');

function getHashValue(value) {
    let hash = crypto.createHash('md5');
    hash.update(value);
    return hash.digest('hex');
}

var userList = async(ctx, next) => {
    var page = ctx.query.page || 1;
    await User.findAndCountAll({
        limit: 10,
        offset: 10 * (page - 1)
    }).then((users) => {
        ctx.rest({ code: 0, data: users, msg: '' })
    }).catch((err) => {
        ctx.rest({ code: 1, data: {}, msg: '服务器异常' })
        console.log(err);
    })
}

var createUser = async(ctx, next) => {
    let { name, passwd, authority } = ctx.request.body;
    if (name == '' || passwd == '' || authority == '') {
        ctx.rest({ code: 1, data: {}, msg: '参数不正确' });
        return;
    }
    passwd = getHashValue(passwd);
    let params = {
        name,
        passwd,
        authority
    }
    await User.create(params).then(() => {
        console.log('用户创建成功');
        ctx.rest({ code: 0, data: {}, msg: '用户创建成功' });
    }).catch(err => {
        console.log('用户创建异常');
        console.log(err);
        ctx.rest({ code: 2, data: params, msg: '创建失败' });
    })
}

module.exports = {
    "GET /api/getUserList": userList,
    "POST /api/createUser": createUser
}