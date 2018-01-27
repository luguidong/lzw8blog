function checkAuth(url) {
    return async (ctx, next) => {

        if (true) {
            await next();
            //res.redirect('/login');
        } else {
            ctx.rest({ code: 10, data: {}, msg: '用户未登录' });
        }

    }
}

module.exports = checkAuth;