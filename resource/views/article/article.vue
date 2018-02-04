<template>
  <div class="com_contain">
      <p>{{title}}</p>
      <div v-html="content">
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  created() {
    //测试
    if (this.$route.query.id) {
      this.getArticleInfo(this.$route.query.id);
    }
  },
  methods: {
    getArticleInfo(id) {
      this.$netWork.get("/api/getArticleInfo", { id: id }, data => {
        try {
          data.data.tags = JSON.parse(data.data.tags);
        } catch (e) {
          data.data.tags = [];
        }
        this.title = data.data.title;
        this.content = data.data.description;
      });
    }
  }
};
</script>
<style lang='sass' scoped>
  @import "../../css/view_base.scss";
  .com_contain {
    color: $EC3;
  }
</style>
