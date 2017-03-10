<template lang="pug">

img

</template>

<script>

import Vue from 'vue';

export default Vue.extend({
  props: ['alt','src'],
  mounted: function() {
    this.$el.alt = this.alt;
    this.$el.src = this.src;
    this.$el.srcset = this.src.replace(/(\.\w+)$/, '@2x$1')+' 2x';
  }
});

</script>