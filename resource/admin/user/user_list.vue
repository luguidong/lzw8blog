<template>
  <div class="common_content">
      <Button shape="circle" type="primary" class="add_button" @click="createUser">
            <Icon type="plus-round" size="14" color="#fff" />
            新建用户
      </Button>
      <Table stripe :columns="columns" :data="userList" style="margin-top:20px;"></Table>
        <Page :current="currentPage" :total='userTotal' style="text-align:center;margin-top:20px;" @on-change='gotoPage'></Page>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "name",
          key: "name"
        },
        {
          title: "operate",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.editUser(params.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "ghost"
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.row.id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      userList: [],
      currentPage: 1,
      userTotal: 0
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      var params = {
        page: this.currentPage
      };
      this.$netWork.get("/api/getUserList", params, data => {
        if (data.code == 0) {
          this.userList = data.data.rows;
          this.userTotal = data.data.count;
        } else {
          this.$Message.err("网络错误");
        }
      });
    },
    createUser() {
      this.$router.push("/admin/create_user");
    },
    editUser() {},
    gotoPage(index) {
      this.currentPage = index;
      this.getUserList();
    },
    deleteUser(id) {
      var params = {
        id: id
      };
      this.$netWork.get("/api/deleteUser", params, data => {
        if (data.code == 0) {
          this.$Message.success("删除成功");
          this.getUserList();
        }
      });
    }
  }
};
</script>
