const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');


function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        //判断是否以指定的url开头,main为开发使用的js/css
        if (rpath.startsWith('/public')) {
            console.log('通过static');
            await next();
        } else if (rpath.startsWith(url)) {
            //获取文件的完整路径
            let fp = path.join(dir, rpath.substring(url.length));
            console.log(fp);
            //判断文件是否存在
            if (await fs.exists(fp)) {
                //查找文件的mime:
                console.log('找到文件了');
                ctx.response.type = mime.lookup(rpath);
                //读取文件的内容并赋值给response.body;
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            //不是指定前缀url，继续处理下一个middleware
            await next();
        }
    }
}
module.exports = staticFiles;