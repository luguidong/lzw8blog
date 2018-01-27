import Vue from 'vue';
import Vuex from 'vuex';
import { routers, baseRouter } from './router';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        routers: ['test'], //路由地址
        allUserAuth: [
        {
            name: 'article_list',
            label: '文章列表',
        }, {
            name: 'edit_article',
            label: '编辑文章',
        }, {
            name: 'create_article',
            label: '新建文章',
        }, {
            name: 'user_list',
            label: '用户列表',
        }, {
            name: 'create_user',
            label: '创建用户',
        }, {
            name: 'todo_list',
            label: '任务列表',
        }, {
            name: 'create_todo',
            label: '创建任务',
        }, {
            name: 'edit_todo',
            label: '编辑任务',
        }] //总权限
    },
    mutations: {
        setRouters(state, routers) {
            state.routers = routers;
        }
    },
    actions: {
        initRouters({ commit, state }, auth) {
            return new Promise((resolve, reject) => {

                let authorities = auth,
                    initRouters = [];
                routers.forEach(item => {
                    let childs = item.children.filter(citem => {
                        if (authorities.indexOf(citem.name) > -1) {
                            return true;
                        }
                    })
                    if (childs.length > 0) {
                        item.children = childs;
                        initRouters.push(item);
                    }
                })

                initRouters = initRouters.concat(baseRouter);
                resolve(initRouters);
            })
        },
        getUserAuth({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/getUserAuth')
                    .then(data => {
                        resolve(data.data.data.auth);
                    })
                    .catch(err => {
                        console.log('网络错误');
                        console.log(err);
                    })
            })
        }
    },
    modules: {

    }
});

export default store;