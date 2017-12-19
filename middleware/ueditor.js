var path = require("path");
var thunkify = require('thunkify');
var parse = require('co-busboy');
//var static_path = path.join(process.cwd(), 'public');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var img_path = '/ueditor/upload/img';
var files_path = '/ueditor/upload/file';
const mime = require('mime');
const fs = require('mz/fs');

function ueditor(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith('/public')) {
            if (ctx.request.query.action === 'config') {
                //ctx.response.type = 'text/plain'
                ctx.redirect('/public/ueditor/nodejs/config.json');
            } else {
                let fp = path.join(dir, rpath.substring(url.length));
                //判断文件是否存在
                console.log('静态资源' + fp);
                if (await fs.exists(fp)) {
                    //查找文件的mime:
                    //ueditor的config必须使用304跳转的形式返回，否则会配置错误
                    if (fp.endsWith('config.json')) {
                        ctx.response.status = 304;
                    } else {
                        ctx.response.type = mime.lookup(rpath);
                    }

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