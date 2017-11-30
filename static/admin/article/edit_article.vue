<template>
    <div class="common_content">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title" >
            <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="简介" prop="intro">
            <Input v-model="formValidate.intro" placeholder="Enter your e-mail"></Input>
        </FormItem>
    
        <FormItem label="标签" prop="flag">
            <CheckboxGroup v-model="formValidate.flag">
                <Checkbox label="js"></Checkbox>
                <Checkbox label="node"></Checkbox>
                <Checkbox label="php"></Checkbox>
                <Checkbox label="vue"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        title: "",
        intro: "",
        flag: [],
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
        flag: [
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
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {};
          for (var item in this.formValidate) {
            params[item] = this.formValidate[item];
          }
          console.log(params);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="sass">
.middle_input{
    width:300px;
}
</style>
