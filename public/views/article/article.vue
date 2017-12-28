<template>
  <div class="com_contain">
      <p>{{title}}</p>
      <div>
        {{content}}
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
        this.content = data.data.desc;
      });
    }
  }
};
</script>
<style>

</style>
