import Vue from 'vue';
import VueRouter from 'vue-router';
import Bus from './resource/js/libs/vue-bus';
import App from './resource/admin/app.vue';
import axios from 'axios';
//设置axios在请求头上带有cookie
axios.defaults.withCredentials = true;
import NetWork from './resource/js/libs/net-work'
import './resource/css/style.css';
import './resource/css/iview.css';
import iView from 'iview';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Bus);
Vue.use(NetWork);

//vuex
import store from './resource/admin/store.js';
store.dispatch('getUserAuth').then(data => {
    store.dispatch('initRouters', data).then(data => {
        initVue(data);
    })
})


function initVue(routers) {
    const RouterConfig = {
        mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
        routes: routers
    };
    const router = new VueRouter(RouterConfig);
    router.beforeEach((to, from, next) => {
        window.document.title = to.meta.title;
        //进度条
        iView.LoadingBar.start();
        var url = '/api/checkLogin'
        axios.get(url, {}).then((data) => {
            if (data.data.data.isLogin == 0) {
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
    var app = new Vue({
        el: '#app',
        router,
        store,
        render: h => {
            return h(App)
        }
    });
}