<template lang="pug">

.tab
  header
    a.barcode(v-on:click="switchTab('barcode')" v-bind:class="{ current: current==='barcode' }")
      span
        img(alt='バーコード' src="/dna-of-forests/img/detail-drawer/icon-barcode.png" srcset="/dna-of-forests/img/detail-drawer/icon-barcode@2x.png 2x")
        | バーコード
    a.text(v-on:click="switchTab('text')" v-bind:class="{ current: current==='text' }")
      span
        img(alt='テキスト' src="/dna-of-forests/img/detail-drawer/icon-text.png" srcset="/dna-of-forests/img/detail-drawer/icon-text@2x.png 2x")
        | テキスト
  div.contents
    div.barcode(v-bind:class="{ current: current=='barcode' }")
      <dna-barcode v-bind:dna="this.text" v-bind:max_width="403">
    div.text(v-bind:class="{ current: current=='text' }")
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

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('dna-barcode', require('./dna-barcode.vue'));

export default Vue.extend({

  props: [
    'text',
    'current'
  ],

  methods: {

    colorize(value) {
      // TODO 色情報はどこか一箇所にまとめる
      return value
        .replace(/A/g, '<span style="color: #ff33a5;">A</span>')
        .replace(/T/g, '<span style="color: #33ff6d;">T</span>')
        .replace(/G/g, '<span style="color: #337eff;">G</span>')
        .replace(/C/g, '<span style="color: #f5ff8a;">C</span>');
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