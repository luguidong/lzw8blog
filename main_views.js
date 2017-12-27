import Vue from 'vue';
import VueRouter from 'vue-router';
import Bus from './public/js/libs/vue-bus';
import App from './public/views/app.vue';
import axios from 'axios';
//设置axios在请求头上带有cookie
axios.defaults.withCredentials = true;
import NetWork from './public/js/libs/net-work'
import Routers from './public/views/router';
//按需引入element
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
//reset.css
import './public/css/view_rest.css';

Vue.use(VueRouter);
Vue.use(Bus);
Vue.use(NetWork);
Vue.use(Element);

const RouterConfig = {
    mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
    routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        window.document.title = to.meta.title;
    } else {
        window.document.title = 'lzw8';
    }
    next();
});
router.afterEach((to, from, next) => {
    //进入页面后回到顶部
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    render: h => {
        return h(App)
    }
});