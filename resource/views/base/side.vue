<template>
  <div class="side_container" :class="{active:showSideBar}">
      <span class="title" @click="selectType('vue')">Vue</span>
      <span class="title" @click="selectType('js')">js</span>
      <span class="title" @click="selectType('node')">node</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showSideBar: false
    };
  },
  created() {
    let that = this;
    this.$bus.on("changeSidebar", () => {
      that.showSideBar = !that.showSideBar;
      that.$bus.emit("setMbState");
    });
  },
  methods: {
    selectType(type) {
      this.$bus.emit("selectArticleType", type);
    }
  }
};
</script>

<style lang="sass" scoped> 
    @import '../../css/view_base.scss';
    .side_container{
        border-right:1px solid #dedede;
        bottom:0;
        min-height:600px;
        position:absolute;
        width:200px;
        top:60px;
        background:#fff;
    }
    .title{
        font-size:20px;
        display:block;
        color:#409EFF;
        padding:20px;
        text-align:center;
        cursor:pointer;
    }
    @include tablet{
        .side_container{
            position:fixed;
            left:-200px;
            transition-property:left;
            transition-duration:0.2s;
            &.active{
                left:0;
            }
        }
    }
</style>
