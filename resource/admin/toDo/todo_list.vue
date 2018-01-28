<template>
    <div class="common_content">
        <Button shape="circle" type="primary" class="add_button" @click="createTodo">
            <Icon type="plus-round" size="14" color="#fff" />
            新建任务
        </Button>
        <Table stripe :columns="columns" :data="todoList"></Table>
        <Page :current="currentPage" :total='todoTotal' style="text-align:center;margin-top:20px;" @on-change='gotoPage'></Page>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "Title",
          key: "title"
        },
        {
          title: "进度",
          key: "stage"
        },
        {
          title: "Tags",
          key: "relat_href"
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
                      this.editTodo(params.row.id);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      todoList: [],
      currentPage: 1,
      todoTotal: 0
    };
  },
  created() {
    this.getTodoList();
  },
  methods: {
    createTodo() {
      this.$router.push("/admin/create_todo");
    },
    getTodoList() {
      this.$netWork.get("/api/todoList", { page: this.currentPage }, data => {
        if (data.code == 0) {
          this.todoList = data.data.rows;
          this.todoTotal = data.data.count;
        } else {
          this.$Message.err("网络错误，请刷新后重试");
        }
      });
    },
    editTodo(id) {
      this.$router.push("/admin/edit_todo/" + id);
    },
    gotoPage(index) {
      this.currentPage = index;
      this.getTodoList();
    }
  }
};
</script>

<style scoped>
.add_button {
  margin-bottom: 20px;
}
</style>
