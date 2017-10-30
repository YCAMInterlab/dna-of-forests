<template lang="pug">

.tab(:data-lang="$root.$i18n.locale")
  header
    a.barcode(v-on:click="switchTab('barcode')" v-bind:class="{ current: current==='barcode' }")
      span
        imgr(:alt="$t('dna_tab.barcode')" src="detail-drawer/icon-barcode.png" global)
        | {{ $t('dna_tab.barcode') }}
    a.text(v-on:click="switchTab('text')" v-bind:class="{ current: current==='text' }")
      span
        imgr(:alt="$t('dna_tab.text')" src="detail-drawer/icon-text.png" global)
        | {{ $t('dna_tab.text') }}
  div.contents
    div.barcode(:class="{ current: current=='barcode' }")
      <dna-barcode :dna="this.text" :max_width="403" />
    div.text(:class="{ current: current=='text' }")
      //- p.dna_text(v-html="colorize(text)" v-on:click="selectAll")
      p.dna_text(v-html="colorize(text)")


</template>

<style lang="sass?indentedSyntax" scoped>

.tab
  >div.contents
    padding: 18px 11px
    background-color: #333
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
    >div:not(.current)
      display: none


header
  width: 100%
  a
    background-color: #262626
    width: 50%
    padding: 10px 0
    text-align: center
    display: inline-block
    cursor: pointer
    img
      margin-right: 7px
      cursor: pointer
    span
      font-size: 12px
      color: #fff
      opacity: 0.3
      cursor: pointer
    &:first-child
      border-top-left-radius: 5px
    &:last-child
      border-top-right-radius: 5px
    &.current
      background-color: #333
      span
        opacity: 0.75
    &:hover
      span
        opacity: 0.5

.contents
  .text
    p
      word-wrap: break-word
      font-size: 12px
      line-height: 2em
      font-weight: bold

[data-lang='en']
  header
    a
      span
        letter-spacing: 0.09em
</style>

<script>

import Vue from 'vue';
import dna_colors from '../script/dna_colors.js';

// 登録
Vue.component('dna-barcode', require('./dna-barcode.vue').default);

export default Vue.extend({
  props: ['text'],
  data: function(){
    return {
      current: 'barcode'
    };
  },
  methods: {

    colorize(value) {
      return value
        .replace(/A/g, '<span style="color: '+dna_colors.A.hex+';">A</span>')
        .replace(/T/g, '<span style="color: '+dna_colors.T.hex+';">T</span>')
        .replace(/G/g, '<span style="color: '+dna_colors.G.hex+';">G</span>')
        .replace(/C/g, '<span style="color: '+dna_colors.C.hex+';">C</span>');
    },

    switchTab(val) {
      this.current = val;
    },

    // selectAll(){
    //   var range = document.createRange();
    //   var selection = window.getSelection();
    //   range.selectNodeContents(this.$el.querySelector('.dna_text'));
    //   selection.removeAllRanges();
    //   selection.addRange(range);
    // }
  }
});

</script>