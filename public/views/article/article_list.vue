<template>
  <div class="container">
    <ul class="article_list">
        <li v-for="item in articleList">
            <router-link to=''>{{item.title}}</router-link>
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
        list-style:none;
    }
</style>
