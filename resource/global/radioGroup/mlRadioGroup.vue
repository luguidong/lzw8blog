<template>
  <div class="radio_label">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "MlRadioGroup",
  componentName: "MlRadioGroup",
  props: {
    value: {}
  },
  data() {
    return {
      inner: 0
    };
  },
  created() {
    //this.$on('handleChange',)
  },
  methods: {}
};
</script>
