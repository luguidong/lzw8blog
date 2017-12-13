<template>
  <div>
      <span @click="test(1)">测试子组件点击</span>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {};
  },
  created() {},
  methods: {
    test(index) {
      console.log(11);
      this.$emit("change", index);
    }
  }
};
</script>
<style lang='sass' scoped>

</style>
