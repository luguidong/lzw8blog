
function checkAuth(url){
    return async(ctx,next)=>{
        
        if(false){
            await next();
            //res.redirect('/login');
        }else{
            await next();
        }
        
    }
}

module.exports = checkAuth;