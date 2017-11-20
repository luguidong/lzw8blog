import Vue from 'vue';
import index from './template/frame.vue';

new Vue({
    el:'#app',
    render:h=>{
        return h(index)
    }
});