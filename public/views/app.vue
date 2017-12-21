<template>
    <div>
        <div>
            <router-view></router-view>
            <button  class="btn" style='position:absolute;z-index:10' data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">
    Copy to clipboard
</button>
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
