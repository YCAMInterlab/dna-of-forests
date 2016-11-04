<template lang="pug">

.drawer
  header
    h2
      img(alt='森の知識' src='/dna-of-forests/img/detail-drawer/title-chisiki.png' srcset='/dna-of-forests/img/detail-drawer/title-chisiki@2x.png 2x')
    router-link.close_btn(to='./')
      img(alt='Close' src='/dna-of-forests/img/detail-drawer/close-btn.png' srcset='/dna-of-forests/img/detail-drawer/close-btn@2x.png 2x')
  article {{ genus_ja }}

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
  padding: 28px 25px
  position: relative
  h2
    text-align: center
  .close_btn
    display: inline-block
    padding: 28px 25px
    position: absolute
    top: 0
    right: 0
    cursor: pointer
    opacity: 0.15
    &:hover
      opacity: 0.5

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
      'id': null,
      'genus_ja': null,
      'genus_en': null,
      'dna': null,
      'region': null,
      'date': null
    }
  },

  methods: {
    fetchData () {
      var idx = this.$route.params.index - 1;
      var _data = null;
      if(0<=this.$route.path.lastIndexOf('/list/')){
        _data = this.$root.samples[idx];
      }
      else{
        _data = this.$root.knowledges[idx];
      }

      // TODO: もっとシンプルに受け渡せないか
      this.id = _data.id;
      this.genus_ja = _data.genus_ja;
      this.genus_en = _data.genus_en;
      this.dna = _data.dna;
      this.region = _data.region;
      this.date = _data.date;
    }
  }
});

</script>