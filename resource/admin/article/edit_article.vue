<template>
    <div class="common_content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title" >
            <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="简介" prop="intro">
            <Input v-model="formValidate.intro" placeholder="Enter your e-mail"></Input>
        </FormItem>
    
        <FormItem label="标签" prop="tags">
            <CheckboxGroup v-model="formValidate.tags">
                <Checkbox label="js"></Checkbox>
                <Checkbox label="node"></Checkbox>
                <Checkbox label="vue"></Checkbox>
            </CheckboxGroup>
        </FormItem>
         <div class="edit_box">
          <UE :defaultMsg='ueditConfig.content' :config = 'ueditConfig'  ref="ueditor"></UE>
        </div>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
        
    </Form>
    </div>
</template>
<script>
import UE from "../../global/editor.vue";
export default {
  data() {
    return {
      formValidate: {
        title: "",
        intro: "",
        tags: [],
        desc: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        intro: [],
        tags: [
          {
            required: true,
            type: "array",
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ]
      },
      ueditConfig: {
        title: "详情",
        style: {
          width: "80px",
          float: "left"
        },
        content: "",
        ueditStyle: {
          marginLeft: "80px"
        }
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getArticleInfo(this.$route.params.id);
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {};
          for (var item in this.formValidate) {
            params[item] = this.formValidate[item];
          }
          //params.tags = JSON.stringify(params.tags);
          params.desc = this.getUeditorContent();
          var url = "";
          if (this.$route.params.id) {
            url = "/api/editArticle";
          } else {
            url = "/api/createArticle";
          }

          this.$netWork.post(url, params, data => {
            if (data.code == 0) {
              this.$Message.success("创建成功");
              setTimeout(() => {
                this.$router.push("/admin/article_list");
              }, 1500);
            } else {
              this.$Message.error("网络异常，请刷新后重试");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getArticleInfo(id) {
      this.$netWork.get("/api/getArticleInfo", { id: id }, data => {
        try {
          data.data.tags = JSON.parse(data.data.tags);
        } catch (e) {
          data.data.tags = [];
        }
        this.formValidate = data.data;
        this.ueditConfig.content = data.data.desc;
      });
    },
    getUeditorContent() {
      return this.$refs.ueditor.getUEContent();
    }
  },
  components: {
    UE
  }
};
</script>
<style lang="sass">
.middle_input{
    width:300px;
}
.edit_box{
  margin-bottom:20px;
}
</style>
