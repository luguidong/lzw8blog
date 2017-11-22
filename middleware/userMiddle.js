
function checkAuth(url){
    return async(ctx,next)=>{
        let rapath = ctx.request.path;
        console.log(rapath);
        if(false){
            await next();
            //res.redirect('/login');
        }else{
            await next();
        }
        
    }
}

module.exports = checkAuth;