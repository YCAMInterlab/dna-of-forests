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
      section
        h3
          img(alt='DNA解析による種の同定' src='/dna-of-forests/img/detail-drawer/title-dna.png' srcset='/dna-of-forests/img/detail-drawer/title-dna@2x.png 2x')
        h4 1. 採取サンプルの写真
        img(alt='サンプル写真' v-bind:src="'/dna-of-forests/img/sample/'+id+'.jpg'" v-bind:srcset="'/dna-of-forests/img/sample/'+id+'@2x.jpg 2x'")
        h4 2. DNA配列
        div.dna_sequence(v-for="item in dna_sequences")
          p DNA領域：{{ item.region }}
          textarea {{ item.text }}
    template(v-if="type=='knowledge'")
      h3 {{ title }}
      img(alt='イメージ写真' v-bind:src="'/dna-of-forests/img/knowledge/'+id+'.jpg'" v-bind:srcset="'/dna-of-forests/img/knowledge/'+id+'@2x.jpg 2x'")
      p {{ description }}


</template>

<style lang="sass?indentedSyntax" scoped>

.drawer
  position: absolute
  width: 490px
  height: 100%
  right: 0
  background-color: #1a1a1a
  z-index: 9999
  box-shadow: 0 0 20px rgba(0,0,0,0.5);

header
  background-color: #2b2b2b
  padding: 28.5px 25px
  position: relative
  margin-bottom: 1px
  h2
    text-align: center
  .close_btn
    display: inline-block
    padding: 28.5px 25px
    position: absolute
    top: 0
    right: 0
    cursor: pointer
    opacity: 0.15
    &:hover
      opacity: 0.5
article
  padding: 25px

section
  h3
    margin: -25px
    margin-bottom: 25px
    text-align: center
    background-color: #2b2b2b
    padding: 21px
h4
  margin-bottom: 13px
  color: #ccc
  &:not(:first-child)
    margin-top: 30px

.dna_sequence
  p
    color: #808080
  textarea
    width: 100%
    overflow: hidden

</style>

<script>

import Vue from 'vue';

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
      'date': null,
      // knowledge
      'title': null,
      'description': null
    }
  },

  methods: {
    fetchData () {
      console.log(this.$route.params.index);
      if(0<=this.$route.params.index.indexOf('s-')){
        var idx = this.$route.params.index.replace('s-','') - 1;
        var _data = this.$root.samples[idx];
        console.log('_data', _data);
        // TODO: もっとシンプルに受け渡せないか
        this.type = 'sample';
        this.id = _data.id;
        this.genus_ja = _data.genus_ja;
        this.genus_en = _data.genus_en;
        this.dna_sequences = _data.dna_sequences;
        console.log('this.dna_sequences',this.dna_sequences)
        this.region = _data.region;
        this.date = _data.date;
        this.title = null;
        this.description = null;
      }
      else if(0<=this.$route.params.index.indexOf('k-')){
        var idx = this.$route.params.index.replace('k-','') - 1;
        var _data = this.$root.knowledges[idx];
        console.log('_data', _data);
        // TODO: もっとシンプルに受け渡せないか
        this.type = 'knowledge';
        this.title = _data.title;
        this.description = _data.description;
        this.id = idx+1;
        this.genus_ja = null;
        this.genus_en = null;
        this.dna_sequences = null;
        this.region = null;
        this.date = null;
      }
      else{
        console.error('Wrong index format...');
      }


    }
  }
});

</script>