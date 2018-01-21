<template>
  <div class="loginCont">
      <div class="loginBox">
        <span>账号：</span>
        <input class="login_input" v-model="account" placeholder="账号" style="width: 200px">
        <br><br>
        <span>密码：</span>
        <input class="login_input" v-model="password" placeholder="密码" type="password" style="width: 200px">
        <br><br>
        <button class="login_btn" @click="login" type="primary" style="width:240px">登录</button>
        <div @click="$router.push('/')" class="index_page">lzw8</div>
        <p class="mistake_tip" v-show="mistake_pw">登录失败，账号密码不匹配</p>
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
  created: function() {
    let _this = this;
    document.onkeyup = function(e) {
      if (window.event)
        //如果window.event对象存在，就以此事件对象为准
        e = window.event;
      var code = e.charCode || e.keyCode;
      if (code == 13) {
        _this.login();
      }
    };
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
  width: 260px;
  height: auto;
  text-align: center;
}
.login_input {
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0em 0em 0em 0em;
  font: 13.3333px Arial;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 1;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  border-radius: 5px;
  display: inline-block;
}
.login_btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.mistake_tip {
  color: #f56c6c;
  font-size: 12px;
}
.index_page {
  color: #409eff;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
}

</style>

