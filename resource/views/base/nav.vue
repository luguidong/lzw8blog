<template>
  <div class="nav_con">
    <el-row>
      
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-col :span='18'>
        <div style="height:60px;"></div>
      </el-col>
      <el-col :span='6'>
          <el-menu-item index="1">lzw</el-menu-item>
          <el-submenu index="2">
            <template slot="title">类别</template>
            <el-menu-item index="2-1">vue</el-menu-item>
            <el-menu-item index="2-2">js</el-menu-item>
            <el-menu-item index="2-3">node</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a @click="$router.push('/login');" target="_blank">管理台</a></el-menu-item>
         </el-col>
        </el-menu>
     
    </el-row>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(keyPath);
      if (key == 1) {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="sass">
    .nav_con{
        width:100%;
        background:#fff;
        height:auto;
        line-height:60px;
    }
</style>
