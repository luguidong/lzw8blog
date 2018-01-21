<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      show_nav: true
    };
  },
  created() {}
};
</script>
<style lang='sass'>
@import "../css/view_rest";

</style>
