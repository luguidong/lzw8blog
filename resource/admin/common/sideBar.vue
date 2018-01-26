<template>
<div class="side_bar_con">
    <Row> 
        <i-col span="8">
            <Menu @on-select="handleHref" width='200px' :theme="theme2" active-key="1-2" :open-keys="['1']" name='menu' :accordion="true">
                <Submenu key="1" name='1'>
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        内容管理
                    </template>
                    <Menu-item name='article_manage'>文章管理</Menu-item>
                    <Menu-item name='comment_manage'>评论管理</Menu-item>
                    <Menu-item name='todo_list'>To Do List</Menu-item>
                </Submenu>
            </Menu>
        </i-col>
    </Row>
</div>
</template>
<script>
export default {
  data() {
    return {
      theme2: "dark"
    };
  },
  methods: {
    handleHref(name) {
      console.log("点击事件" + name);
      switch (name) {
        case "article_manage":
          this.$router.push("/admin/article");
          break;
        case "comment_manage":
          this.$router.push("/admin/comment");
          break;
        case "todo_list":
          this.$router.push("/admin/todo_list");
          break;
        case "user_list":
          this.$router.push("/admin/user_list");
          break;
      }
    }
  }
};
</script>
<style scoped>
.side_bar_con {
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #495060;
}
</style>
