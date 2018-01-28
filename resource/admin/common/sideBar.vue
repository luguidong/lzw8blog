<template>
<div class="side_bar_con">
 
    <Menu @on-select="handleHref" width='200px' :theme="theme2" active-key="1-2" :open-keys="['1']" name='menu' :accordion="true">
        <Submenu :key="index" :name='index' v-if="!item.isBaseRoute" v-for="(item,index) in $router.options.routes">
            <template slot="title">
                <Icon :type="item.iconClass"></Icon>
                {{item.label}}
            </template>
            <Menu-item v-for="(child,cIndex) in item.children" :key="cIndex" :name='child.name'>{{child.label}}</Menu-item>
        </Submenu>
    </Menu>
    
</div>
</template>
<script>
export default {
  data() {
    return {
      theme2: "dark"
    };
  },
  created() {
    console.log(this.$router);
  },
  methods: {
    handleHref(name) {
      console.log("点击事件" + name);
      this.$router.push({ name: name });
    }
  }
};
</script>
<style scoped>
.side_bar_con {
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #495060;
}
</style>
