<template>
  <div class="nav_con">
    <div class="mobile_title" @click="$router.push('/')">lzw8</div>
    <div class="side_switch" @click="changeSideBar">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav_right">
      <ul class="nav_list">
        <li v-for="(item,index) in navList" 
          :key="index" 
          :class="{active:activeIndex==item.index}" 
          @click="handleSelect(item)"
          v-html="item.title"
          > 
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "index",
      navList: [
        {
          title: "lzw",
          index: "index",
          route: "/"
        },
        {
          title: "Github",
          index: "git",
          url: "https://github.com/luguidong/lzw8blog"
        },
        {
          title: "管理台",
          index: "admin",
          route: "/login"
        }
      ]
    };
  },
  methods: {
    handleSelect(item) {
      if (item.hasOwnProperty("route")) {
        this.$router.push(item.route);
        this.activeIndex = item.index;
      } else {
        window.open(item.url);
      }
    },
    changeSideBar() {
      this.$bus.emit("changeSidebar");
    }
  }
};
</script>
<style lang="sass">
@import '../../css/view_base.scss';
    .nav_con{
        width:100%;
        background:#409EFF;
        height:60px;
        line-height:60px;
        position:relative;
    }
    
    
    .nav_right{
      float:right;
      
    }
    .nav_list{
      color:#fff;
      font-size:16px;
      margin:0;
      padding:0;
      li{
        width:80px;
        display:block;
        text-align:center;
        float:right;
        position:relative;
        cursor:pointer;
        margin-right:10px;
        &:hover{
          &:after{
            display:block;
          }
        }
        &.active{
          &:after{
            display:block;
          }
        }
        &:after{
          content:'';
          position:absolute;
          bottom:1px;
          left:0;
          display:none;
          border-bottom:2px solid #fff;
          width:100%;
        }
      }
    }
    .side_switch{
      width:30px;
      position:absolute;
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      left:20px;
      top:0;
      flex-direction:column;
      cursor:pointer;
      span{
        display:block;
        border-top:2px solid $EC10;
        margin:4px 0;
        width:100%;
      }
    }
    @include desktop{
      .side_switch{
        display:none;
      }
      .mobile_title{
        
      }
    }
    @include tablet{
      .nav_right{
        display:none;
      }
      .mobile_title{
        display:flex;
        width:100%;
        height:60px;
        color:#fff;
        font-size:14px;
        justify-content:center;
        align-items:center;
      }
    }
</style>
