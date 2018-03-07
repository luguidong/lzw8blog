<template>
    <div class="common_content">
        <Button shape="circle" type="primary" class="add_button" @click="createArticle">
            <Icon type="plus-round" size="14" color="#fff" />
            新建文章
        </Button>
        <Select v-model="articleTypeValue" style="width:100px;float:right;" @on-change='selectClass'>
            <Option v-for="item in articleTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="articleStateValue" style="width:100px;float:right;" @on-change='selectState'>
            <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Table stripe :columns="columns1" :data="articleList"></Table>
        <Page :current="currentPage" :total='articleTotal' style="text-align:center;margin-top:20px;" @on-change='gotoPage'></Page>
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
              ),
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    value: params.row.id
                  },
                  on: {
                    click: () => {
                      this.deleteArticle(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      articleList: [],
      currentPage: 1,

      articleTotal: 0,
      articleTypeList: [
        {
          value: "all",
          label: "分类"
        },
        {
          value: "vue",
          label: "vue"
        },
        {
          value: "js",
          label: "js"
        },
        {
          value: "node",
          label: "node"
        }
      ],
      articleTypeValue: "all",
      articleStateValue: -1,
      articleStateList: [
        {
          value: -1,
          label: "状态"
        },
        {
          value: 0,
          label: "对外隐藏"
        },
        {
          value: 1,
          label: "对外显示"
        }
      ]
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
      this.$netWork.get(
        "/api/articleList",
        {
          page: this.currentPage,
          type: this.articleTypeValue,
          show_state: this.articleStateValue
        },
        data => {
          if (data.code == 0) {
            this.articleList = data.data.rows;
            this.articleTotal = data.data.count;
          } else {
            this.$Message.err("网络错误，请刷新后重试");
          }
        }
      );
    },
    deleteArticle(id) {
      this.$netWork.pPost("/api/deleteArticle", { id: id }).then(data => {
        this.$Message.info("删除成功");
        this.getArticleList();
      });
    },
    editArticle(id) {
      this.$router.push("/admin/edit_article/" + id);
    },
    gotoPage(index) {
      this.currentPage = index;
      this.getArticleList();
    },
    selectClass(value) {
      this.getArticleList();
    },
    selectState(value) {
      this.getArticleList();
    }
  }
};
</script>

<style scoped>
.add_button {
  margin-bottom: 20px;
}
</style>
