<template>
    <div class="common_content">
        <Button shape="circle" type="primary" class="add_button" @click="createArticle">
            <Icon type="plus-round" size="14" color="#fff" />
            新建文章
        </Button>
        <Table stripe :columns="columns1" :data="articleList"></Table>
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
        },
        {
          title: "operate",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    value: params.row.tags
                  },
                  on: {
                    click: () => {
                      this.editArticle(params.row.id);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      articleList: []
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
          this.articleList = data.data;
          this.articleList.forEach((item, index) => {
            if (item.tags) {
              this.articleList[index].tags = JSON.parse(item.tags).join(",");
            }
          });
        } else {
          this.$Message.err("网络错误，请刷新后重试");
        }
      });
    },
    editArticle(id) {
      this.$router.push("/admin/edit_article/" + id);
    }
  }
};
</script>

<style scoped>
.add_button {
  margin-bottom: 20px;
}
</style>
