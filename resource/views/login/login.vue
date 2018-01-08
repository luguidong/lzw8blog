<template>
  <div class="loginCont">
      <div class="loginBox">
        <el-alert 
            title="提示"
            type="error"
            description="账号或密码错误"
            v-if="mistake_pw"
            show-icon>
        </el-alert>
        <span>账号：</span>
        <el-input v-model="account" placeholder="账号" style="width: 200px"></el-input>
        <br><br>
        <span>密码：</span>
        <el-input v-model="password" placeholder="密码" type="password" style="width: 200px"></el-input>
        <br><br>
        <el-button @click="login" type="primary" style="width:240px">登录</el-button>
    </div>
  </div> 
  
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      mistake_pw: false
    };
  },
  created: () => {
    //this.$bus.on('test',()=>{console.log(1)})
  },
  methods: {
    login() {
      let that = this;
      console.log(this.account);
      this.$netWork.get(
        "/api/login",
        {
          userName: that.account,
          password: that.password
        },
        data => {
          if (data.data.is_login == 0) {
            //登录成功
            console.log("登录成功");
            window.location.href = "/admin/index";
          } else {
            that.mistake_pw = true;
            setTimeout(function() {
              that.mistake_pw = false;
            }, 2000);
            console.log("登录失败");
          }
        }
      );
    }
  }
};
</script>
<style scoped>
.loginCont {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
}
.loginBox {
  width: 300px;
  height: auto;
  text-align: center;
}
</style>

