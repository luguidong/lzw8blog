<template>
    <div class="common_content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title" >
            <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="类型">
          <RadioGroup v-model="formValidate.type">
            <Radio :label="item.value" :key="index" v-for="(item,index) in todoTypeList">{{item.label}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="进度">
          <RadioGroup v-model="formValidate.stage">
            <Radio :label="item.value" :key="index" v-for="(item,index) in todoStageList">{{item.label}}</Radio>
          </RadioGroup>
          <MlGroup v-model="testGroup"></MlGroup>
          外面{{testGroup}}
        </FormItem>
        <FormItem label="关联链接">
            <Input v-model="formValidate.relat_href" placeholder="Enter your href"></Input>
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
import MlGroup from "../../global/radio/mlRadioGroup.vue";
export default {
  data() {
    return {
      testGroup: 0,
      formValidate: {
        title: "",
        stage: 0,
        relat_href: "",
        desc: "",
        type: 0
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        stage: 0,
        relat_href: [
          {
            required: false,
            type: "array",
            message: "Choose at least one hobby",
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
      },
      todoTypeValue: 0,
      todoTypeList: [
        {
          value: 0,
          label: "学习"
        },
        {
          value: 1,
          label: "技术积累"
        }
      ],
      todoStageList: [
        {
          value: 0,
          label: "未完成"
        },
        {
          value: 1,
          label: "已完成"
        }
      ]
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getTodoInfo(this.$route.params.id);
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
          params.desc = this.getUeditorContent();
          var url = "";
          if (this.$route.params.id) {
            url = "/api/editTodo";
          } else {
            url = "/api/createTodo";
          }

          this.$netWork.post(url, params, data => {
            if (data.code == 0) {
              this.$Message.success("创建成功");
              setTimeout(() => {
                this.$router.push("/admin/todo_list");
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
    getTodoInfo(id) {
      this.$netWork.get("/api/getTodoInfo", { id: id }, data => {
        this.formValidate = data.data;
        this.ueditConfig.content = data.data.desc;
      });
    },
    getUeditorContent() {
      return this.$refs.ueditor.getUEContent();
    }
  },
  components: {
    UE,
    MlGroup
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
