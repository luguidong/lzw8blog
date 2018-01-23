import { request } from 'http';

const login = require('./login/login.vue');
const articleList = require('./article/article_list.vue');
const article = require('./article/article.vue');
const main = require('./base/main.vue');
const Routers = [
{
    path: '/',
    name: 'main',
    meta: {
        title: 'lzw8'
    },
    component: main,
    redirect: '/index',
    children: [
    {
        path: '/index',
        component: articleList
    },
    {
        path: '/article',
        component: article,
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