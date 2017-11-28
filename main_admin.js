import Vue from 'vue';
import VueRouter from 'vue-router';
import Bus from './static/js/libs/vue-bus';
import App from './static/admin/app.vue';
import axios from 'axios';
//设置axios在请求头上带有cookie
axios.defaults.withCredentials = true;
import NetWork from './static/js/libs/net-work'
import './static/css/style.css';
import 'iview/dist/styles/iview.css';
import iView from 'iview';

Vue.use(VueRouter);
Vue.use(Bus);
Vue.use(NetWork);
Vue.use(iView);
const Routers = [
    {
        path: '/admin/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./static/admin/article/article_list.vue'], resolve)
    },
    {
        path: '/admin/comment',
        meta: {
            title: '评论'
        },
        component: (resolve) => require(['./static/admin/comments/comment.vue'], resolve)
    },
    {
        path: '/admin/create_article',
        meta: {
            title: '新建文章'
        },
        component: (resolve) => require(['./static/admin/article/edit_article.vue'], resolve)
    },
    {
        path: '*',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./static/admin/article/article_list.vue'], resolve)
    }];

const RouterConfig = {
    mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
    routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    //next();
    //校验登录态,next(false)可以取消导航
    //进度条
    iView.LoadingBar.start();
    var url = '/api/checkLogin'
    if (true) {
        url = "http://localhost:3000" + url;
    }
    axios.get(url, {}).then((data) => {
        if (data.data.data.isLogin == 0) {
            console.log('登录成功');
            next();
        } else {
            window.location.href = '/login'
        }
    }).catch((err) => {
        console.log(err);
    })

});
router.afterEach((to, from, next) => {
    //进入页面后回到顶部
    window.scrollTo(0, 0);
    iView.LoadingBar.finish();
});


new Vue({
    el: '#app',
    router: router,
    render: h => {
        return h(App)
    }
});