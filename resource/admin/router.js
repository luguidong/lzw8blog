const articleList = require('./article/article_list.vue');
const commentList = require('./comments/comment.vue');
const editArticle = require('./article/edit_article.vue');
const todoList = require('./toDo/todo_list.vue');
const editTodo = require('./toDo/edit_todo.vue');
const userList = require('./user/user_list.vue');
const editUser = require('./user/edit_user.vue');
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
    path: '/admin/user_list',
    meta: {
        title: '用户列表'
    },
    component: userList
},
{
    path: '/admin/create_user',
    meta: {
        title: '新建用户'
    },
    component: editUser
},
{
    path: '*',
    meta: {
        title: '首页'
    },
    component: articleList
}];

export default Routers;