<template>
  <div>
    <nav_bar></nav_bar>
    <el-row>
        <el-col :span="4"><side_bar></side_bar></el-col>
        <el-col :span="20"><router-view></router-view></el-col>
    </el-row>
  </div>
</template>
<script>
import nav_bar from "./nav.vue";
import side_bar from "./side.vue";
export default {
  components: {
    nav_bar,
    side_bar
  }
};
</script>
<style lang="sass">
  
</style>
