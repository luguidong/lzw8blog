const db = require('../libs/db');
module.exports = db.defineModel('article', {
    title: {
        type: db.STRING(80)
    },
    intro: db.STRING(200),
    tags: {
        type: db.JSON(200),
        allowNull: true
    },
    description: db.TEXT,
    show_state: { //显示状态，0-不对外显示，1-对外显示
        type: db.INTEGER,
        defaultValue: 0
    }
})