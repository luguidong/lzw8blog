import Vue from 'vue';
import VueRouter from 'vue-router';
import Bus from './static/js/vue-bus';
import App from './static/js/vue/app.vue';
import $ from 'n-zepto';
import './static/css/style.css';

Vue.use(VueRouter);
Vue.use(Bus);
const Routers = [
    {
        path:'/login',
        meta:{
          title:'登录'
        },
        component:(resolve) => require(['./static/js/vue/index/template/frame.vue'],resolve)
    },
    {
        path:'/index',
        meta:{
            title:'首页'
        },
        component:(resolve) => require(['./static/js/vue/index/template/index.vue'],resolve)
    },
    {
        path:'*',
        meta:{
            title:'登录'
        },
        component:(resolve) => require(['./static/js/vue/index/template/frame.vue'],resolve)
    }
];

const RouterConfig = {
    mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
    routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next) => {
    window.document.title = to.meta.title;
    //next();
    //校验登录态,next(false)可以取消导航

    console.log(to.path);
    if(to.path == '/index'){
        $.ajax({
            url:'/api/checkLogin',
            type:'GET',
            dataType:'json',
            data:{
    
            },
            success(data){
                if(data.data.isLogin == 0){
                    console.log('登录成功');
                    next();
               }else{
                    next('/login');
               }
            },
            fail(data){
                console.log('网络错误');
            }
    
        })
    }else{
        next();
    }
    
    
});
router.afterEach((to,from,next) => {
    //进入页面后回到顶部
    window.scrollTo(0,0);
});


new Vue({
   el:'#app',
    router:router,
    render:h => {
       return h(App)
    }
});