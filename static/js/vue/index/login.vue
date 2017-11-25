<template>
  <div>
      <span>账号：</span>
        <input type="text" v-model="account">
        <span>密码：</span>
        <input type="password" v-model="password">
        <button @click='login'>登录</button>
        <router-link to="/index">首页</router-link>
        <router-link to="/user">用户页</router-link>
        <Page :current="1" :total="100"></Page>
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
                    window.location.href = '/user';
                }else{
                    console.log('登录失败');
                }
              }
          })
      }
  }
}
</script>

