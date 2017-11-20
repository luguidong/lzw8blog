<template>
  <div>
      hello my node
      <ul>
        <li v-for="item in products">{{item.name}} <span @click="delPro(item.id)">删除</span></li>
      </ul>
      
  </div> 
  
</template>

<script>
export default {
  data(){
      return {
        products:[]
      }
  },
  created(){
    let that = this;
    $.getJSON('/api/products').done(function (data) {
        that.products = data.products;
    }).fail(function (jqXHR, textStatus) {
        alert('Error: ' + jqXHR.status);
    });
  },
  methods:{
      delPro:function(id){
          let that = this;
          $.ajax({url:'/api/products/'+id,type:"GET"}).done(function(data){
              console.log(data.products);
              that.products = data.products;
          }).fail((jqXHR, textStatus)=>{
              alert('error'+jqXHR.status);
          })
      },
      test:()=>{
          console.log(111);
      }
  }
}
</script>

