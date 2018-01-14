<template>
  <div class="nav_con">
    <el-row>
        <el-menu  background-color="#409EFF"
            text-color="#fff" 
            active-text-color="#fff"
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal" 
            @select="handleSelect">
          <el-col :span='18'>
            <div style="height:60px;"></div>
          </el-col>
          <el-col :span='6'>
              <el-menu-item index="index">lzw</el-menu-item>
              <el-menu-item index="git">Github</el-menu-item>
              <el-menu-item index="admin">管理台</el-menu-item>
          </el-col>
        </el-menu>
    
    </el-row>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "index"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push("/");
      }
    },
    handleSelect(index) {
      console.log(index);
      switch (index) {
        case "index":
          this.$router.push("/");
          break;
        case "git":
          window.open("https://github.com/luguidong/lzw8blog");
          break;
        case "admin":
          this.$router.push("/login");
          break;
      }
    }
  }
};
</script>
<style lang="sass">
    .nav_con{
        width:100%;
        background:#409EFF;
        height:auto;
        line-height:60px;
    }
    
</style>
