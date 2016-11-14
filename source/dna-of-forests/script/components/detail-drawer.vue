<template lang="pug">

.drawer
  header
    h2
      img(v-if="type=='sample'" alt='サンプルのデータ' src='/dna-of-forests/img/detail-drawer/title-sample.png' srcset='/dna-of-forests/img/detail-drawer/title-sample@2x.png 2x')
      img(v-if="type=='knowledge'" alt='森の知識' src='/dna-of-forests/img/detail-drawer/title-chisiki.png' srcset='/dna-of-forests/img/detail-drawer/title-chisiki@2x.png 2x')
    router-link.close_btn(to='./')
      img(alt='Close' src='/dna-of-forests/img/detail-drawer/close-btn.png' srcset='/dna-of-forests/img/detail-drawer/close-btn@2x.png 2x')
  article
    template(v-if="type=='sample'")

      section.dna
        h3
          img(alt='DNA解析による種の同定' src='/dna-of-forests/img/detail-drawer/title-dna.png' srcset='/dna-of-forests/img/detail-drawer/title-dna@2x.png 2x')
        h4 1. 採取サンプルの写真
        img.round(alt='サンプル写真' v-bind:src="'/dna-of-forests/img/sample/'+id+'.jpg'" v-bind:srcset="'/dna-of-forests/img/sample/'+id+'@2x.jpg 2x'")
        h4 2. 同定に用いたDNA配列
        div.dna_sequence(v-for="item in dna_sequences")
          p DNA領域：{{ item.region }}
          <dna-tab v-bind:text="item.text" v-bind:current="'barcode'"></dna-tab>
        h4 3. DNA解析による同定の結果
        div.result
          small {{ genus_en }}
          | {{ genus_ja }}
        div.description
          h4 解析方法について
          p
            | DNAに書かれている情報の一部を読み取り、既に知られているDNAの情報と照らし合わせることで、未知のサンプルから、
            | ある程度まで種名を調べる事ができる「DNAバーコーディング」という技術を使って解析しました。詳しくは、アバウトページを御覧ください。

      section.microscope(v-if="microscope")
        h3
          img(alt='スマホ顕微鏡による観察記録' src='/dna-of-forests/img/detail-drawer/title-sp_microscope.png' srcset='/dna-of-forests/img/detail-drawer/title-sp_microscope@2x.png 2x')
        iframe(v-if="microscope.youtube_id" width="297" height="528" v-bind:src="'https://www.youtube.com/embed/'+microscope.youtube_id+'?rel=0'" frameborder="0" allowfullscreen)
        .bg_line(v-if="microscope.memo")
          dl
            dd(v-html="microscope.memo")

      section.memo(v-if="memo")
        h3
          img(alt='採取メモ' src='/dna-of-forests/img/detail-drawer/title-memo.png' srcset='/dna-of-forests/img/detail-drawer/title-memo@2x.png 2x')
        .bg_line
          dl(v-for="(answer, question) in memo")
            dt {{ question }}
            dd(v-html="answer")
          img(alt='手書きメモ' v-if="memofig_width" v-bind:src="'/dna-of-forests/img/detail-drawer/memo/'+id+'.png'" v-bind:style="{ width: memofig_width }")

    template(v-if="type=='knowledge'")
      h3 {{ title }}
      img.round(alt='イメージ写真' v-bind:src="'/dna-of-forests/img/detail-drawer/knowledge/'+id+'.jpg'" v-bind:srcset="'/dna-of-forests/img/detail-drawer/knowledge/'+id+'@2x.jpg 2x'")
      p {{ description }}


</template>

<style lang="sass?indentedSyntax" scoped>

.drawer
  position: absolute
  width: 490px
  height: 100%
  right: 0
  background-color: #151515
  z-index: 9999
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  overflow: hidden

  // トランジッション
  &.fade-enter-active
    transition-duration: 0.45s
  &.fade-leave-active
    transition-duration: 0.3s
  &.fade-enter,
  &.fade-leave-active
    right: -490px
    opacity: 0

header
  background-color: #0d0d0d
  padding: 28.5px 25px
  position: relative
  border-bottom: 1px solid #1a1a1a
  h2
    text-align: center
  .close_btn
    display: inline-block
    padding: 28.5px 25px
    position: absolute
    top: 0
    right: 0
    cursor: pointer
    opacity: 0.3
    &:hover
      opacity: 0.5
article
  padding: 25px
  overflow-y: auto
  height: calc(100% - 125px)

h3
  font-size: 16px
  margin-bottom: 26px
  text-align: center

p
  font-size: 13px
  line-height: 32px
  letter-spacing: 0.075em
  margin-top: 25px

section

  // Android対策の影響が出ていたので上書き対応
  max-height: inherit

  h3
    margin: 25px -25px
    text-align: center
    background-color: #0d0d0d
    padding: 21px
  &:first-child
    h3
      margin-top: -25px
h4
  margin-bottom: 13px
  color: #ccc
  &:not(:first-child)
    margin-top: 30px

img.round
  border-radius: 5px
  width: 100%

.dna_sequence
  p
    color: #808080
  textarea
    width: 100%
    overflow: hidden

.result
  background-color: #333333
  font-size: 20px
  text-align: center
  font-weight: bold
  padding: 19px 0 23px
  border-radius: 5px
  small
    font-size: 11px
    display: block
    margin-bottom: 12px

.description
  margin: 25px -25px -25px
  padding: 25px
  border-top: 1px solid #333333
  color: #808080
  h4
    color: #808080
  p
    font-size: 13px
    line-height: 28px
    letter-spacing: 0

.microscope
  text-align: center
  .bg_line
    margin-top: 25px

.bg_line
  background-image: url(/dna-of-forests/img/detail-drawer/memo-line.png)
  padding-bottom: 1px
  text-align: center

  // cleafix
  min-height : 1px;
  &:after
    content: '.'
    display: block
    clear: both
    height: 0
    visibility: hidden

  dl
    font-size: 13px
    line-height: 36px
    text-align: left
    clear: both
    &:not(:first-child)
      margin-top: 36px
    dt
      font-weight: bold
      // width: 170px
      // margin-right: 10px
      // float: left
      // clear: bot
    dd
      font-weight: normal
      // width: calc(100% - 180px)
      // float: left

  >img
    margin: 18px auto 36px
    width: 230px
    transform: rotate(-3deg)
    -webkit-transform: rotate(-3deg)

@media (max-width: 660px)
  .drawer
    height: calc(100% - 100px)

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('dna-tab', require('./dna-tab.vue'));

export default Vue.extend({

  created () {
    this.fetchData();
  },

  watch: {
    // ルートが変更されたらfetchDataを再び呼び出す
    '$route': 'fetchData'
  },

  data: function(){
    return {
      'type': null,
      'id': null,
      'genus_ja': null,
      'genus_en': null,
      'dna_sequences': null,
      'region': null,
      'collection_date': null,
      'microscope': null,
      'memo': null,
      'memofig_width': null,
      // knowledge
      'title': null,
      'description': null,
    }
  },

  methods: {
    fetchData () {
      if(0<=this.$route.params.index.indexOf('s-')){
        var idx = this.$route.params.index.replace('s-','') - 1;
        var _data = this.$root.samples[idx];
        // TODO: もっとシンプルに受け渡せないか
        this.type = 'sample';
        this.id = _data.id;
        this.genus_ja = _data.genus_ja;
        this.genus_en = _data.genus_en;
        this.dna_sequences = _data.dna_sequences;
        this.region = _data.region;
        this.collection_date = _data.collection_date;
        this.microscope = _data.microscope;
        this.memo = _data.memo;
        this.memofig_width = _data.memofig_width;
        this.title = null;
        this.description = null;
      }
      else if(0<=this.$route.params.index.indexOf('k-')){
        var idx = this.$route.params.index.replace('k-','') - 1;
        var _data = this.$root.knowledges[idx];
        // TODO: もっとシンプルに受け渡せないか
        this.type = 'knowledge';
        this.title = _data.title;
        this.description = _data.description;
        this.id = idx+1;
        this.genus_ja = null;
        this.genus_en = null;
        this.dna_sequences = null;
        this.region = null;
        this.collection_date = null;
        this.microscope = null;
        this.memo = null;
        this.memofig_width = null;
      }
      else{
        console.error('Wrong index format...');
      }
    }
  }
});

</script>