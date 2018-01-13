<template>
  <label class="radio_label"
    @keydown.space.stop.prevent = "model=label">
    <input type="radio" v-model="model" :value="label">
    <span><slot></slot></span>
  </label>
</template>
<script>
import emitter from "@/js/libs/elEmitter.js";
export default {
  name: "MlRadio",
  componentName: "MlRadio",
  mixins: [emitter],
  props: {
    value: {},
    label: ""
  },
  data() {
    return {};
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "MlRadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("MlRadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      }
    }
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        //this.$emit('change',this.model);
        this.isGroup &&
          this.dispatch("MlRadioGroup", "handleChange", this.model);
      });
    }
  }
};
</script>
