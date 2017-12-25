
const login = require('./login/login.vue');

const Routers = [
    {
        path: '/login',
        name: 'loginPage',
        meta: {
            title: '登录'
        },
        component: login
    },
    {
        path: '*',
        meta: {
            title: '登录'
        },
        component: login
    }
];

export default Routers;