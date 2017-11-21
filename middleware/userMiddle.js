
function checkAuth(url){
    return async(ctx,next)=>{
        let rapath = ctx.request.path;
        console.log(rapath);
        await next();
    }
}

module.exports = checkAuth;