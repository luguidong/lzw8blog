const db = require('../libs/db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        allowNull: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: {
        type: db.INTEGER, //0男 1女 2待定
        defaultValue: 0
    },
    phone: {
        type: db.STRING(11),
        defaultValue: ''
    },
    is_admin: {
        type: db.BOOLEAN,
        defaultValue: false
    },
    authority: {
        type: db.STRING(200),
        defaultValue: '[]'
    }
});