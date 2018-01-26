<template>
    <div>
        <side_bar ></side_bar>
        <div class="container_right">
            <nav_bar> 这里是头部</nav_bar>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import side_bar from "./sideBar.vue";
import nav_bar from "./nav.vue";
export default {
  data() {
    return {};
  },
  components: {
    side_bar,
    nav_bar
  }
};
</script>
<style>
.container_right {
  box-sizing: border-box;
  padding-left: 200px;
}
</style>
