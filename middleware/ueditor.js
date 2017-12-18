var path = require("path");
var fs = require('fs');
var thunkify = require('thunkify');
var parse = require('co-busboy');
var static_path = path.join(process.cwd(), 'public');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var img_path = '/ueditor/upload/img';
var files_path = '/ueditor/upload/file';

function ueditor(path) {
    return async (ctx, next) => {
        //console.log(this);
        const fs = require('fs');
        let rpath = ctx.request.path;
        if (rpath.startsWith('/public')) {
            if (ctx.request.query.action === 'config') {
                ctx.response.header = { 'content-type': 'json' }
                ctx.response.body = fs.createReadStream("./public/ueditor/nodejs/config.json");
            } else {
                let fp = path.join(dir, rpath.substring(url.length));
                //判断文件是否存在
                if (await fs.exists(fp)) {
                    //查找文件的mime:
                    ctx.response.type = mime.lookup(rpath);
                    //读取文件的内容并赋值给response.body;
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