<template>
  <div>
      <span>账号：</span>
        <input type="text" v-model="account">
        <span>密码：</span>
        <input type="password" v-model="password">
        <button @click='login'>登录</button>
        <router-link to="/index">首页</router-link>
  </div> 
  
</template>

<script>

export default {
  data(){
      return {
          account:'',
          password:'',
      } 
  },
  created:()=>{
      //this.$bus.on('test',()=>{console.log(1)});
  },
  methods:{
      login(){
          let that = this;
          $.ajax({
              url:'/api/login',
              dataType:'json',
              type:'GET',
              data:{
                userName:that.account,
                password:that.password
              },
              success:function(data){
                
                if(data.data.is_login == 0){
                    //登录成功
                    //that.$cookieSet.setCookie('sessionId',data.data.sessionId,3600);
                }else{
                    console.log('登录失败');
                }
              }
          })
      }
  }
}
</script>

