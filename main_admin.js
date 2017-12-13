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
import routers from './static/admin/router';

//ueditor
import './static/js/ueditor/ueditor.config.copy.js'
import './static/js/ueditor/ueditor.all.min.js'
import './static/js/ueditor/lang/zh-cn/zh-cn.js'
import './static/js/ueditor/ueditor.parse.min.js'

Vue.use(VueRouter);
Vue.use(Bus);
Vue.use(NetWork);
Vue.use(iView);

const RouterConfig = {
    mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
    routes: routers
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
    router,
    render: h => {
        return h(App)
    }
});