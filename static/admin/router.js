const articleList = require('./article/article_list.vue');
const commentList = require('./comments/comment.vue');
const editArticle = require('./article/edit_article.vue');
const child1 = require('./article/test1.vue');
const child2 = require('./article/test2.vue');


const Routers = [
    {
        path: '/admin/index',
        meta: {
            title: '首页'
        },
        component: articleList,
        children: [
            {
                path: 'test1',
                component: child1
            },
            {
                path: 'test2',
                component: child2
            }]
    },
    {
        path: '/admin/comment',
        meta: {
            title: '评论'
        },
        component: commentList
    },
    {
        path: '/admin/create_article',
        meta: {
            title: '新建文章'
        },
        component: editArticle
    },
    {
        path: '/admin/edit_article/:id',
        meta: {
            title: '编辑文章'
        },
        component: editArticle
    },
    {
        path: '*',
        meta: {
            title: '首页'
        },
        component: articleList
    }];

export default Routers;