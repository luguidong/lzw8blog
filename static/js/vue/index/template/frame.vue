<template>
  <div>
      <span>账号：</span>
        <input type="text" v-model="account">
        <span>密码：</span>
        <input type="password" v-model="password">
        <button @click='login'>登录</button>
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
  methods:{
      login(){
          let that = this;
          console.log(this.account);
          console.log(this.password);
      }
  }
}
</script>

