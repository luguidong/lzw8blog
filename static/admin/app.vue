<template>
    <div>
        <div>
            <Row>
                <i-col :xs="2" :sm="4" :md="6" :lg="8">
                <side_bar :theme = "light"></side_bar>
                </i-col>
                <i-col :xs="20" :sm="16" :md="12" :lg="8">Col</i-col>   
            </Row>
        </div>
        <div>
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
