<template>
  <div>
    <div class="editTitle" :style="config.style">{{config.title}}</div>
    <div :style='config.ueditStyle' id="editor" type="text/plain"></div>
  </div>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      default: "",
      type: String
    },
    config: {
      title: {
        default: ""
      }
    }
  },
  mounted() {
    const _this = this;
    this.editor = UE.getEditor("editor", this.config); // 初始化UE
    this.editor.addListener("ready", function() {
      //console.log("打算放入内容");
      _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
<style lang='sass'>
  .editTitle{
    text-align:right;
    padding-right:10px;
  }
</style>
