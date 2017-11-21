
var fn_index = async (ctx, next) => {
    console.log('登录1');
    ctx.render('index_prod.html',{
        
    })
};

module.exports = {
    'GET /login': fn_index,
    'GET /': fn_index,
}