<template>
  <div class="container">
    <ul class="article_list">
        <li v-for="item in articleList">
            <router-link :to="{path:'/article',query:{id:item.id}}" >{{item.title}}</router-link>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: [],
      currentPath: 1
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.$netWork.get(
        "/api/articleList",
        { page: this.currentPage },
        data => {
          if (data.code == 0) {
            this.articleList = data.data.rows;
            this.articleTotal = data.data.count;
            this.articleList.forEach((item, index) => {
              if (item.tags) {
                this.articleList[index].tags = JSON.parse(item.tags).join(",");
              }
            });
          } else {
            this.$Message.err("网络错误，请刷新后重试");
          }
        }
      );
    }
  }
};
</script>
<style lang="sass">
    .container{
        padding:20px;

    },
    .article_list{
        a{
          color:#909399;
          display:block;
          &:hover{
            color:#409EFF;
          }
        }
        li{
          display:block;
          width:100%;
          line-height:50px;
          height:50px;
          border-bottom:1px solid #EBEEF5;
        }
    }
</style>
