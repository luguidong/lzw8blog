const db = require('../libs/db');
module.exports = db.defineModel('todo', {
    title: {
        type: db.STRING(80)
    },
    stage: {
        type: db.INTEGER,
        defaultValue: 0 //阶段 0代表未完成，1代表完成
    },
    relat_href: {
        type: db.STRING(30),
        defaultValue: ''
    },
    desc: db.TEXT,
    type: {
        type: db.INTEGER,
        defaultValue: 0//任务类型，0 private:个人学习的内容，不对外，1 个人积累的教程 
    }
})