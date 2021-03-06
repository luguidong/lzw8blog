const fs = require('fs');

module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';

        return async (ctx, next) => {
            //如果是public下的，则为编辑器资源
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    console.log('Process API error...');
                    console.log(e);
                    ctx.response.status = 400;

                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                //await next();
                //只允许返回一个页面，其它请求均走api
                console.log(ctx.request.path);
                if (ctx.request.path.startsWith('/admin')) {
                    if (ctx.session.appid) {
                        ctx.render('../public/admin.html', {

                        })
                    } else {
                        ctx.render('../public/views.html', {

                        })
                    }
                } else {
                    ctx.render('../public/views.html', {

                    })
                }

            }
        };
    }
};