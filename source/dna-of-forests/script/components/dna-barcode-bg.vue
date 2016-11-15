<template lang="pug">

.dna_barcode
  <dna-barcode :dna="dna" v-bind:height="1" v-on:drawcomplete="onDrawComplete">

</template>

<style lang="sass?indentedSyntax">

@-webkit-keyframes bgscroll
  0%
    background-position: 0% 0
  100%
    background-position: 2000px 0

@keyframes bgscroll
  0%
    background-position: 0% 0
  100%
    background-position: 2000px 0

.dna_barcode
  display: inline-block
  width: 2000px
  height: 3px
  margin-bottom: 2px
  margin-left: 4px
  -webkit-animation: bgscroll 30s linear infinite
  animation: bgscroll 30s linear infinite
  >canvas
    display: none

</style>

<script>

import Vue from 'vue';

export default Vue.extend({
  props: ['dna'],
  components: {
    'dna-barcode': require('./dna-barcode.vue')
  },
  methods: {
    onDrawComplete(canvas){
      console.log('onDrawComplete', canvas.width);
      this.$el.style =
        'background-image: url('+canvas.toDataURL()+');';
    },
  },
});
</script>