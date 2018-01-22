const path = require("path");
//var static_path = path.join(process.cwd(), 'public');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
var img_path = '/upload/img';
var files_path = '/upload/file';
const fs = require('fs-promise');
const os = require('os');
const koaBody = require('koa-body');
const mime = require('mime');
function uid() {
    return Math.random().toString(36).slice(2);
}

function ueditor(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith('/public/ueditor')) {
            let action = ctx.request.query.action;
            if (action === 'config') {
                //ctx.response.type = 'text/plain'
                ctx.redirect('/public/ueditor/nodejs/config.json');
            }
            else if (action === 'uploadimage' || action === 'uploadfile') {
                const uploadImage = path.join(__dirname, '../public/upload/images');

                // make the temporary directory
                //await fs.mkdir(tmpdir);
                const filePaths = [];
                const files = ctx.request.body.files || {};

                for (let key in files) {
                    const file = files[key];
                    console.log(file.path);
                    const fileEnds = file.name.substring(file.name.indexOf('.'));
                    const fileName = uid() + fileEnds;
                    const filePath = path.join(uploadImage, fileName);
                    const reader = fs.createReadStream(file.path);
                    const writer = fs.createWriteStream(filePath);
                    reader.pipe(writer);
                    filePaths.push(fileName);
                }
                if (filePaths.length == 1) {
                    var params = {
                        state: 'SUCCESS',
                        original: '',
                        size: 2323,
                        title: '.jpg',
                        type: '.jpg',
                        url: ctx.body = '/public/upload/images/' + filePaths[0]
                    }
                    ctx.body = params;
                } else {
                    ctx.body = filePaths;
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