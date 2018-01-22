const db = require('../libs/db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN,
    phone: db.STRING(11),
    is_admin: db.BOOLEAN,
    authority: {
        type: db.STRING(200),
        defaultValue: '[]'
    }
});