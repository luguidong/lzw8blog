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
                initRouters = routers.filter(item => {
                    if (authorities.indexOf(item.name) > -1) {
                        return true;
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