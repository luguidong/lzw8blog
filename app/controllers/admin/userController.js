//新增用户，权限管理
let User = require('../../models/User');

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

module.exports = {
    "GET /api/getUserList": userList
}