const mainView = require('./common/main.vue');

const articleList = () => import('./article/article_list.vue');
const commentList = () => import('./comments/comment.vue');
const editArticle = () => import('./article/edit_article.vue');
const todoList = () => import('./toDo/todo_list.vue');
const editTodo = () => import('./toDo/edit_todo.vue');
const userList = () => import('./user/user_list.vue');
const editUser = () => import('./user/edit_user.vue');

export const routers = [
    {
        path: '/',
        redirect: '/admin/article_list',
        component: mainView,
        label: '内容管理',
        iconClass: 'ios-paper',
        children: [
            {
                path: '/admin/article_list',
                name: 'article_list',
                label: '文章列表',
                meta: {
                    title: '首页'
                },
                component: articleList
            },
            {
                path: '/admin/comment',
                name: 'comment_list',
                label: '评论列表',
                meta: {
                    title: '评论'
                },
                component: commentList
            },
            {
                path: '/admin/create_article',
                name: 'create_article',
                label: '新建文章',
                meta: {
                    title: '新建文章'
                },
                component: editArticle
            },
            {
                path: '/admin/edit_article/:id',
                name: 'edit_article',
                isEdit: true,
                meta: {
                    title: '编辑文章'
                },
                component: editArticle
            },
            {
                path: '/admin/todo_List',
                name: 'todo_list',
                label: '目标列表',
                meta: {
                    title: 'toDo'
                },
                component: todoList
            },
            {
                path: '/admin/create_todo',
                name: 'create_todo',
                label: '创建任务',
                meta: {
                    title: 'toDo'
                },
                component: editTodo
            },
            {
                path: '/admin/edit_todo/:id',
                name: 'edit_todo',
                isEdit: true,
                meta: {
                    title: 'toDo'
                },
                component: editTodo
            }]
    },
    {
        path: '/admin/user',
        label: '用户管理',
        leaf: true,
        component: mainView,
        iconClass: 'person',
        children: [
            {
                path: '/admin/user_list',
                name: 'user_list',
                label: '用户列表',
                meta: {
                    title: '用户列表'
                },
                component: userList
            },
            {
                path: '/admin/create_user',
                name: 'create_user',
                label: '新建用户',
                meta: {
                    title: '新建用户'
                },
                component: editUser
            }]
    }];
export const baseRouter = [
    {
        path: '*',
        redirect: '/admin/article_list',
        component: mainView,
        label: '内容管理',
        isBaseRoute: true,
        iconClass: 'ios-paper',
        children: [
            {
                path: '/admin/article_list',
                name: 'article_list',
                label: '文章列表',
                meta: {
                    title: '首页'
                },
                component: articleList
            },]
    }]

//export default Routers;