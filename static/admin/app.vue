<template>
    <div>
        <div class="container_left">
            <side_bar :theme = "light"></side_bar>
        </div>
        <div class="container_right">
            <div>这里是头部</div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import side_bar from './index/sideBar.vue';
    export default{
        data(){
            return {
                show_nav:true
            }
        },
        components:{
            side_bar
        }
    }
</script>
<style>
.container_left{
    width:200px;
    position: fixed;
    left: 0;
    top:0;
    background:#fff;
}
.container_right{
    box-sizing: border-box;
    padding-left: 200px;
    background:#d8d8d8;
}
</style>
