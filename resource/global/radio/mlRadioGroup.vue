<template>
  <div class="radio_label"
    @click = "changeValue">
    <span>里面的值{{inner}}</span>
  </div>
</template>
<script>
export default {
  name: "MlRadio",
  componentName: "MlRadio",
  props: {
    value: 0
  },
  data() {
    return {
      inner: 0
    };
  },
  created() {
    this.inner = this.value;
  },
  methods: {
    changeValue() {
      console.log(this.inner);
      this.inner++;
      this.$emit("input", this.inner);
    }
  }
};
</script>
