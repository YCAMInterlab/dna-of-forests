<template lang="pug">

.drawer(:data-lang="$root.$i18n.locale")
  header
    h2
      imgr(:alt="$t('detail_drawer.sample.title')" src='detail-drawer/title-sample.png' locale global v-if="type=='sample'")
      imgr(:alt="$t('detail_drawer.tips.title')" src='detail-drawer/title-tips.png' locale global v-if="type=='knowledge'")
    router-link.close_btn(to='./')
      imgr(alt='Close' src='detail-drawer/close-btn.png' global)
  article
    template(v-if="type=='sample'")

      section.dna
        h3
          imgr(:alt="$t('detail_drawer.sample.article.dna.title')" src='detail-drawer/title-dna.png' locale global)
        h4 1. {{ $t('detail_drawer.sample.article.dna.photo_of_the_sample') }}
        .image_wrapper
          imgr(:alt="$t('detail_drawer.sample.article.dna.photo_of_the_sample')" :src="'detail-drawer/sample/'+id+'.jpg'")
        h4 2. {{ $t('detail_drawer.sample.article.dna.dna_sequence_to_identify') }}
        div.dna_sequence(v-for="item in dna_sequences")
          p {{ $t('detail_drawer.sample.article.dna.dna_region') }}{{ item.region }}
          <dna-tab :text="item.text" />
        h4 3. {{ label() }}
        div.result(v-if="$root.$i18n.locale === 'ja'")
          small {{ genus.en }}
          | {{ genus.ja }}
        div.result.expand(v-else)
          | {{ genus.en }}
        div.description
          h4 {{ $t('detail_drawer.sample.article.dna.method.title') }}
          p(v-html="$t('detail_drawer.sample.article.dna.method.body')")

      section.microscope(v-if="microscope")
        h3
          imgr(:alt="$t('detail_drawer.sample.article.microscope.title')" src='detail-drawer/title-sp_microscope.png' locale global)
        iframe(v-if="microscope.youtube_id" width="297" height="528" :src="'https://www.youtube.com/embed/'+microscope.youtube_id+'?rel=0'" frameborder="0" allowfullscreen)
        .bg_line(v-if="$root.$i18n.locale === 'ja' && microscope.memo")
          dl
            dd(v-html="microscope.memo")

      section.specimen(v-if="specimen")
        h3
          imgr(:alt="$t('detail_drawer.sample.article.specimen.title')" src='detail-drawer/title-specimen.png' locale global)
        img.photo(:src="'/dna-of-forests/'+$route.params.forest+'/img/detail-drawer/specimen/'+id+'.jpg'")

      section.memo(v-if="($root.$i18n.locale === 'en' && memofig_width) || ($root.$i18n.locale === 'ja' && memo)")
        h3
          imgr(:alt="$t('detail_drawer.sample.article.memo.title')" src='detail-drawer/title-memo.png' locale global)
        .bg_line
          dl(v-if="$root.$i18n.locale === 'ja'" v-for="(answer, question) in memo")
            dt {{ question }}
            dd(v-html="answer")
          img(:alt="$t('detail_drawer.sample.article.memo.sketch')" v-if="memofig_width" :src="'/dna-of-forests/'+$route.params.forest+'/img/detail-drawer/memo/'+id+'.png'" :style="{ width: memofig_width }")

      section.note(v-if="note")
        .bg_line {{ note[$root.$i18n.locale] }}

    template(v-if="type=='knowledge'")
      h3 {{ title[$root.$i18n.locale] }}
      .image_wrapper
        imgr(:alt="title[$root.$i18n.locale]" :src="'detail-drawer/knowledge/'+id+'.jpg'")
      p(v-html="description[$root.$i18n.locale]")


</template>

<style lang="sass?indentedSyntax" scoped>

.drawer
  position: fixed
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
    transition-duration: 0.45s
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
  // ↓これがないとiOS Safariで慣性スクロールが有効化されない
  -webkit-overflow-scrolling: touch

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

@-moz-keyframes spin
  0%
    -moz-transform: rotate(0deg)
  100%
    -moz-transform: rotate(360deg)
@-webkit-keyframes spin
  0%
    -webkit-transform: rotate(0deg)
  100%
    -webkit-transform: rotate(360deg)
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

.image_wrapper
  width: 440px
  height: 277px
  border-radius: 5px
  background-color: #262626
  position: relative
  overflow: hidden
  &:before
    content: ""
    position: absolute
    width: 32px
    height: 32px
    top: calc(50% - 16px)
    left: calc(50% - 16px)
    z-index: 1
    background: transparent url(/dna-of-forests/img/detail-drawer/loader.png) no-repeat center
    -webkit-animation-name: spin
    -webkit-animation-duration: 400ms
    -webkit-animation-iteration-count: infinite
    -webkit-animation-timing-function: linear
    -moz-animation-name: spin
    -moz-animation-duration: 400ms
    -moz-animation-iteration-count: infinite
    -moz-animation-timing-function: linear
    -ms-animation-name: spin
    -ms-animation-duration: 400ms
    -ms-animation-iteration-count: infinite
    -ms-animation-timing-function: linear
    animation-name: spin
    animation-duration: 400ms
    animation-iteration-count: infinite
    animation-timing-function: linear
  >img
    z-index: 2
    position: absolute
    border-radius: 5px

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
  &.expand
    padding: 34px 0

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

.specimen
  text-align: center
  .photo
    width: calc(100% - 50px)

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

  font-size: 13px
  line-height: 36px

  dl
    clear: both
    text-align: left
    &:not(:first-child)
      margin-top: 36px
    dt
      font-weight: bold
    dd
      font-weight: normal

  >img
    margin: 18px auto 36px
    width: 230px
    transform: rotate(-3deg)
    -webkit-transform: rotate(-3deg)

section.note
  margin-top: 36px
  color: #808080
  .bg_line
    text-align: left

@media (max-width: 660px)
  .drawer
    height: calc(100% - 100px)

[data-lang='en']
  h3,
  h4,
  .result
    letter-spacing: 0.09em
  p
    letter-spacing: 0.09em

</style>

<script>

import Vue from 'vue';
import _ from 'lodash';
import util from '../script/util';

// 登録
Vue.component('dna-tab', require('./dna-tab.vue').default);

export default Vue.extend({

  created () {
    this.fetchData();
  },

  watch: {
    // ルートが変更されたらfetchDataを再び呼び出す
    '$route': 'fetchData'
  },

  data: function(){
    return _.cloneDeep(this.initial_data);
  },

  props: ['markers','initial_data'],

  methods: {
    // new_dataのもつプロパティを、old_dataのプロパティに代入する
    initWithData(old_data, new_data) {
      for(var key in new_data){
        if(new_data.hasOwnProperty(key)){
          // 再帰条件
          if(key === 'genus'){
            this.initWithData(old_data[key], new_data[key]);
          }
          else {
            old_data[key] = new_data[key];
          }
        }
      }
    },
    fetchData() {
      var idx, _data;
      var p_index = this.$route.params.index;
      if(0<=p_index.indexOf('s-')){
        idx = p_index.replace('s-','') - 1;
        _data = this.markers.samples[idx];
        _data.type = 'sample';
      }
      else if(0<=p_index.indexOf('k-')){
        idx = p_index.replace('k-','') - 1;
        _data = this.markers.knowledges[idx];
        _data.id = idx+1;
        _data.type = 'knowledge';
      }
      else{
        console.error('Wrong index format...');
      }

      // 現在のdataをnullで初期化しinitialized_dataに格納
      var initialized_data = util.initWithNullValue(_.cloneDeep(this.$data));
      // initialized_dataに_dataを上書きしてdataに格納
      _data = _.defaultsDeep(_data, initialized_data);
      this.initWithData(this, _data);
    },
    label() {
      // TODO: This is messy implementation. How can I override messages depend on current forest?
      if(this.$route.params.forest == 'kumano' && this.$root.$i18n.locale == 'ja') {
        return '採集者による推定結果';
      }
      else {
        return this.$t('detail_drawer.sample.article.dna.result_of_identification');
      }
    }
  }
});

</script>