<template>
  <div>
    <nav_bar></nav_bar>
    <el-row>
        <el-col :span="4">这里是导航</el-col>
        <el-col :span="20"><router-view></router-view></el-col>
    </el-row>
  </div>
</template>
<script>
import nav_bar from "./nav.vue";
export default {
  components: {
    nav_bar
  }
};
</script>
<style lang="sass">

</style>
