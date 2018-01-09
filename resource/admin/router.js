const articleList = require('./article/article_list.vue');
const commentList = require('./comments/comment.vue');
const editArticle = require('./article/edit_article.vue');
const todoList = require('./toDo/todo_list.vue');
const editTodo = require('./toDo/edit_todo.vue');

const Routers = [
{
    path: '/admin/index',
    meta: {
        title: '首页'
    },
    component: articleList
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
    path: '/admin/todo_List',
    meta: {
        title: 'toDo'
    },
    component: todoList
},
{
    path: '/admin/create_todo',
    meta: {
        title: 'toDo'
    },
    component: editTodo
},
{
    path: '/admin/edit_todo/:id',
    meta: {
        title: 'toDo'
    },
    component: editTodo
},
{
    path: '*',
    meta: {
        title: '首页'
    },
    component: articleList
}];

export default Routers;