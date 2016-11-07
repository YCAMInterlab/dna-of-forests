<template lang="pug">

section
  h1
    img(alt='採取したサンプル' src='img/list/title-samples.png' srcset='img/list/title-samples@2x.png 2x')
  table#samples
    thead
      tr
        th.index No.
        th.genus_ja 属名
        th.genus_en 属名（英）
        th.dna_region 同定に用いたDNA領域
        th.dna_text DNA配列
        th.collection_date 採取日
    tbody
      tr(v-for="(item, index) in samples" v-on:click="$router.push('/list/s-'+(index+1))" v-bind:class="{ selected: $route.path=='/list/s-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}
        td.genus_ja {{ item.genus_ja }}
        td.genus_en {{ item.genus_en }}
        td.dna_region {{ item.dna_sequences[0].region }}
        td.dna_text
          <dna-barcode :dna="item.dna_sequences[0].text">
        td.collection_date {{ item.collection_date }}
  h1
    img(alt='森の知識' src='img/list/title-knowledges.png' srcset='img/list/title-knowledges@2x.png 2x')
  table#knowledge
    tbody
      tr(v-for="(item, index) in knowledges" v-on:click="$router.push('./k-'+(index+1))" v-bind:class="{ selected: $route.path=='./k-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}
        td.title {{ item.title }}
        td.description {{ item.description }}

</template>

<style lang="sass?indentedSyntax" scoped>

section
  height: 100%
  overflow-y: auto
h1
  padding: 28px 27px
  background-color: #2b2b2b
  margin-bottom: 1px

table
  width: 100%
  max-width: 100%
  font-size: 14px

  tr
    height: 55px
    th,td
      vertical-align: middle
      padding-left: 27px
      &:last-child
        padding-right: 27px

  thead
    background-color: #2b2b2b
    th
      text-align: left
      color: #656566
      font-size: 12px
  tbody
    tr:hover
      background-color: #202020
      cursor: pointer
    tr.selected
      background-color: #272727
    td
      &.dna
        max-width: 150px
        overflow: hidden
        white-space: nowrap
      &.index
        font-family: 'Hiragino Maru Gothic Pro','ヒラギノ丸ゴ Pro W6','HiraMaruProN-W6', '游ゴシック体', 'Yu Gothic', YuGothic, 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', sans-serif
        font-weight: bold
        width: 30px
      &.title,
      &.genus_ja
          width: 150px
      &.description
        max-width: 150px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

</style>

<script>
import Vue from 'vue';

export default Vue.extend({
  filters: {
    'zero-pad': function (value) {
      return (value<10) ? '0'+value : ''+value;
    }
  },
  components: {
    'dna-barcode': require('./dna-barcode.vue')
  },
  data () {
    // TODO: 直接ルートのComponentから受け渡せないか？
    return require('../data.json');
  }
});
</script>
