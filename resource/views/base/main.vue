<template>
  <div>
    <div class="global_mb" :class={active:setMbState}></div>
    <nav_bar></nav_bar>
    <side_bar></side_bar>
    <div class="main_content">
      <router-view></router-view>
    </div>
  </div>
  
</template>
<script>
import nav_bar from "./nav.vue";
import side_bar from "./side.vue";
export default {
  data() {
    return {
      setMbState: false
    };
  },
  created() {
    let that = this;
    this.$bus.on("setMbState", () => {
      console.log(111);
      that.setMbState = !that.setMbState;
    });
  },
  components: {
    nav_bar,
    side_bar
  }
};
</script>
<style lang="sass">
  @import '../../css/view_base.scss';
  @include desktop{
    .main_content{
      margin-left:200px;
    }
  }
  @include tablet{
    .global_mb{
      position:fixed;
      width:100%;
      height:100%;
      left:0;
      top:0;
      visibility:hidden;
      background:rgba(0,0,0,0);
      transition-duration:0.3s;
      transition-property:visibility,background;
      &.active{
        visibility:visible;
        background:rgba(0,0,0,0.5);
      }
    }
  }
</style>
