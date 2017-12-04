//文章新建、编辑与列表
let Article = require('../../models/Article');
var articleList = async(ctx, next) => {
    var articles = await Article.findAll({

    }).then((articles) => {
        ctx.rest({ code: 0, data: articles, msg: '' });
    }).catch((err) => {
        console.log(err);
    })

}

function editArticle() {

}
var createArticle = async(ctx, next) => {
    var col = ctx.request.body;
    var { title, intro, tags, desc } = col;
    var params = {
        title: title || '',
        intro: intro || '',
        tags: tags || '',
        desc: desc || ''
    };
    var tctx = ctx;
    await (async(ctx, next) => {
        await Article.create(params).then(function () {
            console.log('创建文章成功');
            tctx.rest({ code: 0, data: {}, msg: '创建文章成功' });
        }).catch((err) => {
            console.log(`创建文章失败`);
            console.log(err);
        })
    })();
}

module.exports = {
    'GET /api/articleList': articleList,
    'GET /api/editArticle': editArticle,
    'POST /api/createArticle': createArticle
}