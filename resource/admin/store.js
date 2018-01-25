import Vue from 'vue';
import Vuex from 'vuex';

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

    },
    modules: {

    }
});