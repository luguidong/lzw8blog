//自动扫描并导入所有model
const fs = require('fs');
const db = require('../libs/db');
const path = require('path');
let rootDir = path.join(__dirname, '../');
let files = fs.readdirSync(rootDir + '/models');
let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    let name = f.substring(0, f.length - 3);
    let task = require(rootDir + '/models/' + f);
    module.exports[name] = task;
}

module.exports.sync = () => {
    db.sync();
};

