<template>
  <label class="radio_label"
    @keydown.space.stop.prevent = "model=label">
    <span>ceshi radio</span>
  </label>
</template>
<script>
export default {
  name: "MlRadioGroup",
  componentName: "MlRadioGroup",
  computed: {
    model: {
      get() {},
      set(val) {}
    }
  }
};
</script>
