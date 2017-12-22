var path = require("path");
var thunkify = require('thunkify');
var parse = require('co-busboy');
//var static_path = path.join(process.cwd(), 'public');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var img_path = '/upload/img';
var files_path = '/upload/file';
const mime = require('mime');
const fs = require('mz/fs');

function ueditor(url, dir) {
    return async(ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith('/public/ueditor')) {
            let action = ctx.request.query.action;
            if (action === 'config') {
                //ctx.response.type = 'text/plain'
                ctx.redirect('/public/ueditor/nodejs/config.json');
            }
            else if (action === 'uploadimage' || action === 'uploadfile') {
                console.log('shangchuanzhong');
                var parts = parse(ctx.request);
                var part;
                var stream;
                var tmp_name;
                var file_path;
                var filename;
                var i = 0;
                while (part = parts[i++]) {
                    console.log('shangchuanzhong');
                    if (part.length) {
                        // fields are returned as arrays
                        var key = part[0];
                        var value = part[1];
                        // check the CSRF token
                        //if (key === '_csrf') this.assertCSRF(value);
                    } else {
                        // files are returned as readable streams
                        // let's just save them to disk
                        if (action === 'uploadimage' && img_type.indexOf(path.extname(part.filename)) >= 0) {
                            filename = 'pic_' + (new Date()).getTime() + '_' + part.filename;
                            file_path = path.join(img_path, filename);
                        } else if (action === 'uploadfile') {
                            filename = 'file_' + (new Date()).getTime() + '_' + part.filename;
                            file_path = path.join(files_path, filename);
                        }
                        stream = fs.createWriteStream(path.join(static_path, file_path));
                        part.pipe(stream);
                        console.log('uploading %s -> %s', part.filename, stream.path);
                        tmp_name = part.filename;
                    }
                }
                ctx.response.body = {
                    'url': file_path,
                    'title': filename,
                    'original': tmp_name,
                    'state': 'SUCCESS'
                }
            }
            else {
                let fp = path.join(dir, rpath.substring(url.length));
                //判断文件是否存在
                if (await fs.exists(fp)) {
                    //查找文件的mime:
                    ctx.response.type = mime.lookup(rpath);
                    ctx.response.body = await fs.readFile(fp);
                } else {
                    ctx.response.status = 404;
                }
            }

        } else {
            await next();
        }

    }
}

module.exports = ueditor;