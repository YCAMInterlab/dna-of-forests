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
        th(colspan='2').dna 同定に用いたDNA配列
        th.collection_date 採取日
    tbody
      tr(v-for="(item, index) in samples" v-on:click="$router.push('/list/s-'+(index+1))" v-bind:class="{ selected: $route.path=='/list/s-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}
        td.genus_ja {{ item.genus_ja }}
        td.genus_en {{ item.genus_en }}
        template(v-if="item.dna_sequences.length==0")
          td.dna(colspan='2')
        template(v-if="item.dna_sequences.length==1")
          td.dna(colspan='2')
            span.region {{ item.dna_sequences[0].region }}
            <dna-barcode :dna="item.dna_sequences[0].text">
        template(v-if="item.dna_sequences.length==2")
          td.dna1
            span.region {{ item.dna_sequences[0].region }}
            <dna-barcode :dna="item.dna_sequences[0].text">
          td.dna2
            span.region {{ item.dna_sequences[1].region }}
            <dna-barcode :dna="item.dna_sequences[1].text">
        td.collection_date {{ item.collection_date }}
  h1
    img(alt='森の知識' src='img/list/title-knowledges.png' srcset='img/list/title-knowledges@2x.png 2x')
  table#knowledges
    tbody
      tr(v-for="(item, index) in knowledges" v-on:click="$router.push('/list/k-'+(index+1))" v-bind:class="{ selected: $route.path=='/list/k-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}
        td.title {{ item.title }}
        td.description {{ item.description }}

</template>

<style lang="sass?indentedSyntax" scoped>

section
  height: 100%
  overflow-y: auto
  background-color: #151515
h1
  padding: 28px 27px
  background-color: #0d0d0d
  border-bottom: 1px solid #1a1a1a

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
    background-color: #0d0d0d
    th
      text-align: left
      color: #656566
      font-size: 12px
  tbody
    color: #979799
    tr:hover
      background-color: #1d1d1d
      cursor: pointer
    tr.selected
      background-color: #202020
    td
      white-space: nowrap
      &.dna
        max-width: 300px
        overflow: hidden
        white-space: nowrap
      &.dna1,
      &.dna2
        max-width: 150px
        overflow: hidden
        white-space: nowrap
      .region
        display: inline-block
        width: 32px
        margin-right: 8px
        text-align: right
      &.index
        font-family: 'Roboto'
        font-weight: bold
        letter-spacing: 0.025em
        width: 30px
      &.title,
      &.description,
      &.index,
      &.genus_ja
        color: #fff
      &.title,
      &.genus_ja,
      &.genus_en
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
