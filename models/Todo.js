const db = require('../libs/db');
module.exports = db.defineModel('todo', {
    title: {
        type: db.STRING(80)
    },
    stage: {
        type: db.INTEGER,
        defaultValue: 0 //0代表未完成，1代表完成
    },
    relat_href: {
        type: db.STRING(30),
        defaultValue: ''
    },
    desc: db.TEXT
})