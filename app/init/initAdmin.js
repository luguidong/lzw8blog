let User = require('../models/User');
const crypto = require('crypto');
let now = Date.now();

const hash = crypto.createHash('md5');
hash.update('152867');
var pwd = hash.digest('hex');
(async() => {
    var pets = await User.findAll({
        where: {
            name: 'melon'
        }
    });
    console.log('查询到的user:' + JSON.stringify(pets[0]));
    if (pets.length > 0) {
        //已存在管理员，初始化密码
        await (async() => {
            var p = await pets[0];
            p.gender = true;
            p.updatedAt = Date.now();
            p.version++;
            p.passwd = pwd;
            await p.save();
        })().then(function () {
            console.log('重置管理员密码：152867');
        });
    } else {
        //不存在管理员，新建
        User.create({
            name: 'melon',
            gender: 0,
            phone: '13638105937',
            is_admin: 'true',
            passwd: pwd,
            email: '920430764@qq.com'
        }).then(function (p) {
            console.log('initadmin:' + JSON.stringify(p));
        }).catch(function (err) {
            console.log('initadmin fail' + err);
        })
    }
})()