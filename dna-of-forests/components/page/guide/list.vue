<template lang="pug">

section.list(:data-lang="$root.$i18n.locale")
  h1
    imgr(:alt="$t('list.samples.title')" src='list/title-samples.png' locale global)
  table#samples
    thead
      tr
        th.index {{ $t('list.samples.index') }}
        th.result {{ $t('list.samples.result') }}
        th(colspan='2').dna {{ $t('list.samples.dna') }}
        th.collection_date {{ $t('list.samples.collection_date') }}
    tbody
      tr(v-for="(item, index) in markers.samples" :id="'s-'+(index+1)" v-on:click="goMarker('s-'+(index+1))" v-bind:class="{ selected: $route.path=='/'+$route.params.forest+'/list/s-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}

        td.result(v-if="$root.$i18n.locale === 'ja'")
          | {{ item.genus.ja }}
          span.genus_en ({{ item.genus.en }})
        td.result(v-else)
          | {{ item.genus.en }}

        template(v-if="item.dna_sequences")
          template(v-if="item.dna_sequences.length==0")
            td.dna(colspan='2')
          template(v-if="item.dna_sequences.length==1")
            td.dna(colspan='2')
              span.region {{ item.dna_sequences[0].region }}
              <dna-barcode :dna="item.dna_sequences[0].text" />
          template(v-if="item.dna_sequences.length==2")
            td.dna1
              span.region {{ item.dna_sequences[0].region }}
              <dna-barcode :dna="item.dna_sequences[0].text" />
            td.dna2
              span.region {{ item.dna_sequences[1].region }}
              <dna-barcode :dna="item.dna_sequences[1].text" />
        template(v-else)
          td.dna(colspan='2')
        td.collection_date {{ dateFormat(item.collection_date) }}
  h1
    imgr(:alt="$t('list.tips.title')" src='list/title-knowledges.png' locale global)
  table#knowledges
    tbody
      tr(v-for="(item, index) in markers.knowledges" :id="'k-'+(index+1)" v-on:click="goMarker('k-'+(index+1))" v-bind:class="{ selected: $route.path=='/'+$route.params.forest+'/list/k-'+(index+1) }")
        td.index {{ (index+1) | zero-pad }}
        td.title {{ item.title[$root.$i18n.locale] }}
        td.description {{ item.description[$root.$i18n.locale] | striptags }}

</template>

<style lang="sass?indentedSyntax" scoped>

section.list
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
      .genus_en
        margin-left: 1em
        color: #979799
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
      &.result
        color: #fff
      &.title,
      &.result,
      &.description
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      &.title
        width: 150px
      &.result,
      &.description
        max-width: 150px
      &.collection_date
        width: 80px

@media (max-width: 1000px)
  table
    td.result
      width: 150px
      .genus_en
        display: none

@media (max-width: 660px)
  table
    .genus_en,
    .collection_date
      display: none

[data-lang='en']
  table
    thead
      th
        letter-spacing: 0.1em

  table#samples
    tr
      th,td
        &:last-child
          width: 100px
      td.result
        letter-spacing: 0.1em
  table#knowledges
    tr
      td.title,
      td.description
        letter-spacing: 0.09em
      td.description
        color: #979799

</style>

<script>
import Vue from 'vue';
import striptags from 'striptags';
import moment from 'moment';

export default Vue.extend({
  filters: {
    'zero-pad': function (value) {
      return (value<10) ? '0'+value : ''+value;
    },
    'striptags': function (html) {
      return striptags(html);
    }
  },
  components: {
    'dna-barcode': require('../../dna-barcode.vue').default
  },
  props: ['markers'],
  mounted: function() {
    // this.$ua.trackView('List', 'currentpath');

    // 選択された行がある場合は、そこまでスクロール
    if(this.$route.params.index){
      var selectedRow = document.querySelector('#'+this.$route.params.index);
      var offset = this.getOffsetTop(selectedRow);
      this.$el.scrollTop = offset;
    }
  },
  methods: {
    getOffsetTop(el){
      var offsetTop = 0;
      do {
        if(!isNaN( el.offsetTop)){
          offsetTop += el.offsetTop;
        }
        el = el.offsetParent;
      }
      while(el.offsetParent != document.body);
      return offsetTop;
    },
    dateFormat(date){
      var format = (this.$root.$i18n.locale === 'en') ? 'DD MMM YYYY' : 'YYYY.MM.DD';
      return moment(date, 'YYYY.MM.DD').format(format); // moment()の第２引数がないとSafariで正しく作成されない
    },
    goMarker(id) {
      this.$router.push(`/${this.$route.params.forest}/list/${id}`);
    }
  }
});
</script>
