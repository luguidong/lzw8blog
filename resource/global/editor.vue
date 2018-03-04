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
      editor: null,
      editorReady: false
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
  created() {
    //if (!document.querySelector("#ueditorEl")) {
    let tempBody = document.querySelector("body");
    let tempConfig = document.createElement("script");
    tempConfig.src = "/public/ueditor/ueditor.config.js";
    tempConfig.setAttribute("id", "ueditorEl");
    let tempEdit = document.createElement("script");
    tempEdit.src = "/public/ueditor/ueditor.all.min.js";
    let tempLang = document.createElement("script");
    tempLang.src = "/public/ueditor/lang/zh-cn/zh-cn.js";
    tempBody.appendChild(tempConfig);
    tempBody.appendChild(tempEdit);
    tempBody.appendChild(tempLang);
    //}
  },
  mounted() {
    const _this = this;
    let editDownFlag = setInterval(() => {
      try {
        this.initEditor();
        this.editor = UE.getEditor("editor", this.config); // 初始化UE
        this.editor.addListener("ready", function() {
          //console.log("打算放入内容");
          _this.editorReady = true;
          _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
          console.log(_this.defaultMsg);
        });
      } catch (e) {
        console.log("还在加载中,请稍候");
      }
    }, 100);
  },
  watch: {
    defaultMsg(newVal) {
      if (this.editorReady) {
        this.editor.setContent(this.defaultMsg);
        console.log("设置内容");
      }
    }
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    initEditor() {
      let ueditor_config = {
        toolbars: [
          [
            "undo",
            "redo",
            "|",
            "fontsize",
            "forecolor",
            "bold",
            "italic",
            "underline",
            "|",

            "justifyleft",
            "justifycenter",
            "justifyright",
            "justifyjustify",
            "lineheight",
            "|",
            "directionalityltr",
            "directionalityrtl",
            "indent",
            "|",

            "simpleupload",
            "insertframe",
            "insertcode",
            "emotion",
            "|",

            "backcolor",
            "autotypeset",
            "link",
            "spechars",
            "source",
            "|",
            "searchreplace",
            "|",
            "fullscreen" //全屏
          ]
        ],
        initialFrameWidth: 700,
        initialFrameHeight: 320,
        autoHeightEnabled: false
      };
      Object.assign(UEDITOR_CONFIG, ueditor_config);
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
