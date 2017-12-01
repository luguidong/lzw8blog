//文章新建、编辑与列表
let Article = require('../../models/Article');
function articleList() {

}
function editArticle() {

}
module.exports = {
    'GET /api/articleList': articleList,
    'GET /api/editArticle': editArticle
}