const login = require('./login/login.vue');
const articleList = require('./article/article_list.vue');
const main = require('./base/main.vue');
const Routers = [
{
    path: '/',
    name: 'main',
    meta: {
        title: '首页'
    },
    component: main,
    redirect: '/index',
    children: [
    {
        path: '/index',
        component: articleList
    }]
},
{
    path: '/login',
    name: 'loginPage',
    meta: {
        title: '登录'
    },
    component: login
},
{
    path: '*',
    meta: {
        title: '登录'
    },
    component: login
}];

export default Routers;