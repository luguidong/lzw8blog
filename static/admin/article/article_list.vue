<template>
    <div class="common_content">
        <Button shape="circle" type="primary" class="add_button" @click="createArticle">
            <Icon type="plus-round" size="14" color="#fff" />
            新建文章
        </Button>
        
        
        <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Title",
          key: "title"
        },
        {
          title: "Intro",
          key: "intro"
        },
        {
          title: "Tags",
          key: "tags"
        }
      ],
      data1: []
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    createArticle() {
      this.$router.push("/admin/create_article");
    },
    getArticleList() {
      this.$netWork.get("/api/articleList", {}, data => {
        if (data.code == 0) {
          this.data1 = data.data;
        } else {
          this.$Message.err("网络错误，请刷新后重试");
        }
      });
    }
  }
};
</script>

<style scoped>
.add_button {
  margin-bottom: 20px;
}
</style>
