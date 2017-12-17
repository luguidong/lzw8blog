const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            console.log('注册:' + path);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            console.log('注册:' + path);
            router.post(path, mapping[url]);
        } else {
            console.log('invalid url' + url);
        }
    }
}

function addControllers(router) {
    var jsFiles = getFilesWinthEnd(path.join(__dirname, '../controllers/'), '.js')
    for (var f of jsFiles) {
        let mapping = require(f);
        addMapping(router, mapping);
    }
}

function getFilesWinthEnd(path, ends) {
    var controllerFiles = [];
    ScanDir(path, ends);

    function ScanDir(path, ends) {
        let that = this;
        if (fs.statSync(path).isFile()) {
            if (path.endsWith(ends)) {
                controllerFiles.push(path);
            }
        }
        try {
            fs.readdirSync(path).forEach(function (file) {
                ScanDir.call(that, path + '/' + file, ends);
            })
        } catch (e) {}
    };
    return controllerFiles;
}


/**
 * 递归遍历文件夹的所有满足后缀的文件,练手代码，废弃
 * @param {*} dir 
 * @returns files[]
 */

function forEeachWithEnd(dirname, ends) {

    fs.readdir(dirname, function (err, files) {
        if (err) {
            console.log('file warn' + err);
        } else {
            var fileColl = [];
            var length = files.length;
            for (var i = 0; i < length; i++) {
                var dir = path.join(dirname, files[i]);
                fs.stat(dir, function (err, stats) {
                    if (err) {
                        console.log('file warn' + err);
                        return fileColl;
                    } else {
                        if (stats.isFile()) {
                            if (i == length - 1) {
                                return fileColl.push(dir);
                            } else {
                                fileColl.push(dir);
                            }
                            console.log(fileColl);
                        } else if (stats.isDirectory()) {
                            //判断是不是最后一个文件或者目录，如果是则返回，不是则继续读取
                            if (i == length - 1) {
                                var c = forEeachWithEnd(dir, ends);
                                return fileColl.push.apply(fileColl, c);
                            } else {
                                fileColl.push.apply(fileColl, c);
                            }
                        }
                    }
                });
            }
        }
    });
}


module.exports = function (dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    
    var ueditor = require('koa-ueditor')('static');//配置ueditor
    router.all('/static/js/ueditor/ue',ueditor);
    return router.routes();
}