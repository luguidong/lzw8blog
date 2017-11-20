//自动扫描并导入所有model
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname+'/models');
let js_files = files.filter((f)=>{
    return f.endsWith('.js');
},files);

module.exports = {};

for(let f of js_files){
    let name = f.substring(0,f.length - 3);
    let task = require(__dirname+'/models/'+f);
    module.exports[name] = task;
}

module.exports.sync = () => {
    db.sync();
};

