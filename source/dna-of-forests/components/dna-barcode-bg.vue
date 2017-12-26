<template lang="pug">

.dna_barcode
  <dna-barcode :dna="dna" :height="1" v-on:drawcomplete="onDrawComplete" />

</template>

<style lang="sass?indentedSyntax">

@-webkit-keyframes bgscroll
  0%
    background-position: 0% 0
  100%
    background-position: 10000px 0

@keyframes bgscroll
  0%
    background-position: 0% 0
  100%
    background-position: 10000px 0

.dna_barcode
  display: inline-block
  width: 2000px
  height: 2px
  margin-bottom: 2px
  margin-left: 4px
  >canvas
    display: none

</style>

<script>

import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  props: ['dna'],
  components: {
    'dna-barcode': require('./dna-barcode.vue').default
  },
  methods: {
    onDrawComplete(canvas){
      var rnd = _.random(70, 200);
      this.$el.style.backgroundImage = 'url('+canvas.toDataURL()+')';
      this.$el.style.animation = 'bgscroll '+rnd+'s linear infinite';
      canvas.parentNode.removeChild(canvas);
    },
  },
});
</script>