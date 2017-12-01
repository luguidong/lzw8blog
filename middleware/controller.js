const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            console.log('invalid url' + url);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(path.join(__dirname, '../controllers/'));
    var js_files = files.filter((f) => {
        if (f)
            return f.endsWith('.js');
    })
    console.log(forEeachWithEnd(path.join(__dirname, '../controllers/'), '.js'));
    for (var f of js_files) {
        let mapping = require(path.join(__dirname, '../controllers/' + f));
        addMapping(router, mapping);
    }
}

/**
 * 递归遍历文件夹的所有满足后缀的文件
 * @param {*} dir 
 * @returns files[]
 */
function forEeachWithEnd(dirname, ends) {
    var fileColl = [];
    fs.readdir(dirname, function (err, files) {
        if (err) {
            console.log('file warn' + err);
        } else {
            files.forEach(function (filename) {
                var dir = path.join(dirname, filename);
                fs.stat(dir, function (err, stats) {
                    if (err) {
                        console.log('file warn' + err);
                    } else {
                        if (stats.isFile()) {
                            fileColl.push(dir);
                        } else if (stats.isDirectory()) {
                            var c = forEeachWithEnd(dir, ends);
                            fileColl.push.apply(fileColl, c);
                        }

                    }
                });
            });
        }
    });
    return fileColl;
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}