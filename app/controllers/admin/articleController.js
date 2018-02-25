//文章新建、编辑与列表
let Article = require('../../models/Article');
let db = require('../../libs/db');

var articleList = async (ctx, next) => {
    let { page, type, show_state } = ctx.query;
    page = page || 1;
    show_state = show_state || 0; //默认显示对外展示的
    let where = ``;
    if (show_state == 0 || (show_state && show_state != -1)) {
        where += where ? ` and show_state=${show_state}` :
            `where show_state = ${show_state}`;
    }
    if (type && type != 'all') {
        where += where ? ` and JSON_CONTAINS(tags,'["${type}"]')` : `where JSON_CONTAINS(tags,'["${type}"]')`
    }
    let sqlCount = `select count(*) as count from article ${where}`
    let sqlRows = `select title,intro,tags,id,createdAt,updatedAt from article ${where} limit ${10 * (page - 1)},10`;

    var rows = [],
        count = 0;
    await db.sequelize.query(sqlCount, { type: db.sequelize.QueryTypes.SELECT }).then(res => {
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
    await Article.findAll({
        where: {
            id: id
        }
    }).then(article => {

        console.log('tags类型' + typeof article[0].tags);
        ctx.rest({ code: 0, data: article[0], msg: '获取成功' });
    }).catch(err => {
        console.log(err);
    });
}
var editArticle = async (ctx, next) => {
    var { id, title, intro, tags, description, show_state } = ctx.request.body;
    let params = {
        title,
        intro,
        tags,
        description,
        show_state
    }
    var article = await Article.update(params, {
        where: {
            id: id
        }
    }).then(article => {
        if (article.length > 0) {
            ctx.rest({ code: 0, data: {}, msg: '更新成功' });
        } else {
            ctx.rest({ code: 2, data: {}, msg: '文章不存在' });
        }
    }).catch(err => {
        console.log(err);
        ctx.rest({ code: 3, data: {}, msg: '网络异常' });
    });

}
var createArticle = async (ctx, next) => {
    var col = ctx.request.body;
    var { title, intro, tags, description, show_state } = col;
    var params = {
        title: title || '',
        intro: intro || '',
        tags: tags || '',
        description: description || '',
        show_state: show_state || 1
    };
    await Article.create(params).then(function () {
        console.log('创建文章成功');
        ctx.rest({ code: 0, data: {}, msg: '创建文章成功' });
    }).catch((err) => {
        console.log(`创建文章失败`);
        console.log(err);
    })
}

module.exports = {
    'GET /api/articleList': articleList,
    'GET /api/getArticleInfo': getArticle,
    'POST /api/createArticle': createArticle,
    'POST /api/editArticle': editArticle
}