
function checkAuth(url){
    return async(ctx,nextTick)=>{
        let rapath = ctx.request.path;
        console.log(rapath);
    }
}

module.exports = checkAuth;