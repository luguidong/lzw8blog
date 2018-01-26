import Vue from 'vue';
import Vuex from 'vuex';
import { routers } from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        routers: ['test'] //路由地址
    },
    mutations: {
        setRouters(state, routers) {
            state.routers = routers;
        }
    },
    actions: {
        initRouters({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                let authorities = ['article_list', 'create_article'],
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
                resolve(initRouters);
            })
        }
    },
    modules: {

    }
});

export default store;