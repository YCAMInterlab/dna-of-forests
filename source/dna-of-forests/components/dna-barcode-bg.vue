<template lang="pug">
.dna_barcode(:style="styles" :class="{ animate }")
  <dna-barcode :dna="dna" :height="1" v-on:drawcomplete="onDrawComplete" />
</template>

<style lang="sass">
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
  background-image: var(--canvasDataURL)
  >canvas
    display: none
  &.animate
    animation: var(--animation)
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';

export default Vue.extend({
  props: {
    dna: {
      type: String,
      require: true
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      canvasDataURL: ''
    }
  },
  computed: {
    styles () {
      return {
        '--canvasDataURL': `url(${this.canvasDataURL})`,
        '--animation': `bgscroll ${_.random(70, 200)}s linear infinite`
      }
    }
  },
  components: {
    'dna-barcode': require('./dna-barcode.vue').default
  },
  methods: {
    onDrawComplete(canvas){
      this.canvasDataURL = canvas.toDataURL()
      canvas.parentNode.removeChild(canvas);
    }
  }
})
</script>