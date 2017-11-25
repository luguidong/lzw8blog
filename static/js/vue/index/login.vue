<template>
  <div class="loginCont">
      <div class="loginBox">
        <Alert type="error" show-icon v-if="mistake_pw">
            An error prompt
            <span slot="desc">
                Custom error description copywriting.
            </span>
        </Alert>
        <span>账号：</span>
        <Input v-model="account" placeholder="账号" style="width: 200px"></Input>
        <br><br>
        <span>密码：</span>
        <Input v-model="password" placeholder="密码" type="password" style="width: 200px"></Input>
        <br><br>
        <i-button @click="login" type="primary" style="width:240px">登录</i-button>
    </div>
  </div> 
  
</template>

<script>

export default {
  data(){
      return {
          account:'',
          password:'',
          mistake_pw:false
      } 
  },
  created:()=>{
      //this.$bus.on('test',()=>{console.log(1)});
  },
  methods:{
      login(){
          let that = this;
          $.ajax({
              url:'http://localhost:3000/api/login',
              dataType:'json',
              type:'GET',
              data:{
                userName:that.account,
                password:that.password
              },
              success:function(data){
                if(data.data.is_login == 0){
                    //登录成功
                    console.log('登录成功');
                    window.location.href = '/user';
                }else{
                    that.mistake_pw = true;
                    setTimeout(function(){
                        that.mistake_pw = false;
                    },2000);
                    console.log('登录失败');
                }
              }
          })
      }
  }
}
</script>
<style scoped>
    .loginCont{
        width:100%;
        height: 100%;
        display: flex;
        position: absolute;
        left: 0;
        top:0;
        align-items: center;
        justify-content:center;
        
    }
    .loginBox{
        width:300px;
        height: auto;
        text-align: center;
    }
</style>

