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
                <Submenu key="2" name='2'>
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>
                    <Menu-item name='user_list'>用户列表</Menu-item>
                    <Menu-item key="2-2" name='2-2'>活跃用户</Menu-item>
                </Submenu>
                <Submenu key="3" name='3'>
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </template>
                    <Menu-group title="使用">
                        <Menu-item key="3-1" name='3-1'>新增和启动</Menu-item>
                        <Menu-item key="3-2" name='3-2'>活跃分析</Menu-item>
                        <Menu-item key="3-3" name='3-3'>时段分析</Menu-item>
                    </Menu-group>
                    <Menu-group title="留存">
                        <Menu-item key="3-4" name='3-4'>用户留存</Menu-item>
                        <Menu-item key="3-5" name='3-5'>流失用户</Menu-item>
                    </Menu-group>
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
