<template>
<div class="nav_con">
  <div class="header_box">
        <Dropdown placement="bottom-end">
            <img class="header_img" src="/public/images/logo.png" alt="">
            <Dropdown-menu slot="list">
                <Dropdown-item>退出登录</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="sass">
.nav_con {
  width: 100%;
  position: relative;
  height: 40px;
  border-bottom: 1px solid #d8d8d8;
  background: #fff;
}
.header_img {
  width: 30px;
  height: 30px;
  border: 1px solid #d8d8d8;
  border-radius: 100%;
}
.header_box {
  float: right;
  margin-right: 20px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
