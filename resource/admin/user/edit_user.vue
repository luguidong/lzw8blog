<template>
  <div class="common_content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="用户名" prop='name'>
              <Input v-model="formValidate.name" placeholder="输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop='passwd'>
              <Input type="password" v-model="formValidate.passwd"></Input>
          </FormItem>
          <FormItem label="权限" prop='authority'>
              <CheckboxGroup v-model="formValidate.authority">
                <Checkbox label='article_list'>文章列表</Checkbox>
                <Checkbox label='create_article'>新建文章</Checkbox>
                <Checkbox label='user_list'>用户列表</Checkbox>
                <Checkbox label='create_user'>新建用户</Checkbox>
              </CheckboxGroup>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="createUser('formValidate')">Submit</Button>
              <Button type="ghost" @click="handleRest('formValidate')" style='margin-left:8px'>reset</Button>
          </FormItem>
          
      </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: "",
        passwd: "",
        authority: []
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        passwd: [
          {
            required: true,
            message: "The passwd cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    createUser: function() {
      let params = {};
      //遇到一个神奇的情况，如果是对象等于对象，新对象的操作会影响到原对象
      params.name = this.formValidate.name;
      params.passwd = this.formValidate.passwd;
      params.authority = JSON.stringify(this.formValidate.authority);
      console.log(this.formValidate.authority);
      this.$netWork.post("/api/createUser", params, data => {
        if (data.code == 0) {
          this.$Message.success("创建成功");
          setTimeout(() => {
            this.$router.push("/admin/user_list");
          }, 1500);
        } else {
          this.$Message.error(data.msg);
        }
      });
    },
    handleRest() {}
  }
};
</script>