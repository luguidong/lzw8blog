const db = require('../libs/db');
module.exports = db.defineModel('article', {
    title: {
        type: db.STRING(80)
    },
    intro: db.STRING(200),
    tags: db.INTEGER,
    desc: db.TEXT
})