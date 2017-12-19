var path = require("path");
var thunkify = require('thunkify');
var parse = require('co-busboy');
//var static_path = path.join(process.cwd(), 'public');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var img_path = '/ueditor/upload/img';
var files_path = '/ueditor/upload/file';
const mime = require('mime');
const fs = require('mz/fs');

function ueditor(url) {
    return async(ctx, next) => {
        //console.log(this);
        const fs = require('fs');
        let rpath = ctx.request.path;
        if (rpath.startsWith('/public')) {
            if (ctx.request.query.action === 'config') {
                ctx.redirect('/public/ueditor/nodejs/config.json');
            } else {
                let fp = path.join(url, rpath.substring('/public'.length));
                //判断文件是否存在
                console.log('静态资源' + fp);
                if (await fs.exists('E:/workspace/lzw8blog/static/images/logo.png')) {
                    //查找文件的mime:
                    console.log('已找到文件');

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