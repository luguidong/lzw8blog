//文章新建、编辑与列表
let Article = require('../../models/Article');
let db = require('../../libs/db');

var articleList = async (ctx, next) => {
    let { page, type } = ctx.query;
    page = page || 1;
    let where = '';
    if (type && type != 'all') {
        where = `where JSON_CONTAINS(tags,'["${type}"]')`;
    }
    let sqlCount = `select count(*) as count from article ${where}`
    let sqlRows = `select title,intro,tags,id,createdAt,updatedAt from article ${where} limit ${10 * (page - 1)},10`;

    var rows = [],
        count = 0;
    await db.sequelize.query(sqlCount, { type: db.sequelize.QueryTypes.SELECT }).then(res => {
        console.log('---------');
        console.log(res);
        count = res[0].count;
        console.log(count);
    });
    await db.sequelize.query(sqlRows, { type: db.sequelize.QueryTypes.SELECT }).then(project => {
        console.log(project);
        rows = project;
    })
    ctx.rest({ code: 0, data: { rows, count }, msg: '' });
}

var getArticle = async (ctx, next) => {
    var id = ctx.query.id;
    console.log(id);
    await Article.findAll({
        where: {
            id: id
        }
    }).then(article => {
        ctx.rest({ code: 0, data: article[0], msg: '获取成功' });
    }).catch(err => {
        console.log(err);
    });
}
var editArticle = async (ctx, next) => {
    var { id, title, intro, tags, description } = ctx.request.body;
    var tctx = ctx;
    var article = await Article.findAll({
        where: {
            id: id
        }
    }).then(async (article) => {
        if (article.length > 0) {
            await (async () => {
                article = article[0];
                article.title = title;
                article.intro = intro;
                article.tags = tags;
                article.description = description;
                await article.save();
                console.log('已经更新了');
            })().then(() => {
                console.log('准备回复了');
                tctx.rest({ code: 0, data: {}, msg: '更新成功' });
            }).catch((err) => {
                tctx.rest({ code: 1, data: {}, msg: '更新失败' })
                console.log('更新异常' + err);
            });
        } else {
            tctx.rest({ code: 2, data: {}, msg: '文章不存在' });
        }
    }).catch(err => {
        console.log(err);
        tctx.rest({ code: 3, data: {}, msg: '网络异常' });
    });

}
var createArticle = async (ctx, next) => {
    var col = ctx.request.body;
    var { title, intro, tags, description } = col;
    var params = {
        title: title || '',
        intro: intro || '',
        tags: tags || '',
        description: description || ''
    };
    var tctx = ctx;
    await (async (ctx, next) => {
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
    'GET /api/getArticleInfo': getArticle,
    'POST /api/createArticle': createArticle,
    'POST /api/editArticle': editArticle
}