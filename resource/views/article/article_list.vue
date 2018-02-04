<template>
  <div class="container">
    <ul class="article_list" v-if="articleList.length > 0">
        <li v-for="(item,index) in articleList" :key="index">
            <router-link :to="{path:'/article',query:{id:item.id}}" >{{item.title}}</router-link>
        </li>
    </ul>
    <p class="article_null" v-else>暂时没有该分类的内容</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: [],
      currentPath: 1,
      type: "all"
    };
  },
  created() {
    this.getArticleList();
    this.$bus.on("selectArticleType", type => {
      this.type = type;
      this.getArticleList();
    });
  },
  methods: {
    getArticleList() {
      this.$netWork.get(
        "/api/articleList",
        { page: this.currentPage, type: this.type },
        data => {
          if (data.code == 0) {
            this.articleList = data.data.rows;
            this.articleTotal = data.data.count;
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
    .article_null{
      color:#909399;
      text-align:center;
    }
</style>
