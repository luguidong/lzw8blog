import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Bus from './vue-bus';
import App from './app.vue';
import './style.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Bus);
const Routers = [
    {
        path:'/index',
        meta:{
          title:'首页'
        },
        component:(resolve) => require(['./views/index.vue'],resolve)
    },
    {
        path:'/testh5',
        meta:{
            title:'h5前端模拟环境'
        },
        component:(resolve) => require(['./views/testh5.vue'],resolve)
    },
    {
        path:'/about',
        meta:{
            title:'介绍页'
        },
        component:(resolve) => require(['./views/about.vue'],resolve)
    },
    {
        path:'/user/:id',
        meta:{
            title:'用户页'
        },
        component:(resolve) => require(['./views/user.vue'],resolve)
    },
    {
        path:'*',
        meta:{
            title:'首页'
        },
        component:(resolve) => require(['./views/index.vue'],resolve)
    }
];

const RouterConfig = {
    mode: 'history', //hash，通过改变浏览器地址栏且不跳转改变页面
    routes: Routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next) => {
    window.document.title = to.meta.title;
    next();
    //校验登录态,next(false)可以取消导航
    // if(window.localStorage.getItem('token')){
    //     next();
    // }else{
    //     next('/login');
    // }
});
router.afterEach((to,from,next) => {
    //进入页面后回到顶部
    window.scrollTo(0,0);
});

const moduleA = {
    state:{
    },
    mutations:{
        a(state){

        }
    },
    getters:{
        a(state,getters,rootState){

        }
    },
    actions:{}
}
const moduleB = {
    state:{
    },
    mutations:{},
    getters:{
    },
    actions:{}
}
const store = new Vuex.Store({
    //vuex 配置
    state:{
        count:0,
        list:[1,2,3,4,5,6,7,8]
    },
    mutations:{
        increment (state,n=1){
            state.count+=n;
        },
        decrease(state,n=1){
            state.count--;
        }
    },
    getters: {
        filteredList:(state,getters)=>{
            return state.list.filter(item => item < 5);
        },
        xxx:state=>{

        }

    },
    actions:{
        increment(context){
            // context.commit('increment'); //直接调用

            //pending\resolved\rejected 三个状态
            const p = new Promise((resolve,reject)=>{
                const random = Math.random();
                if(random > 0.5){
                    resolve(random);
                }else{
                    reject(random);
                }
            });
            p.then(val => {
                console.log(val);
            }).catch(val=>{
               console.log(val);
            });

            return new Promise(resolve=>{
                setTimeout(()=>{
                    context.commit('increment');
                    resolve();
                },1000);
            });//异步方法
        }
    },
    modules:{
        a:moduleA,
        b:moduleB
    }
});
new Vue({
   el:'#app',
    store:store,
    router:router,
    render:h => {
       return h(App)
    }
});