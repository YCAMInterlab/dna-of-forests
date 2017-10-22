<template lang="pug">

.root
  <global-nav />
  router-view.content
  transition(name='fade')
    detail-drawer('v-if'="$route.params.index")

</template>

<style lang="sass?indentedSyntax" scoped>

.root
  position: relative
  height: 100%
  min-height: 100%
  width: 100%
  overflow: hidden

.content
  width: calc(100% - 80px)
  float: left
  height: 100%
  overflow: hidden
  background-color: #000
  position: relative
  // ↓これがないとiOS Safariで慣性スクロールが有効化されない
  -webkit-overflow-scrolling: touch

// Facebookアプリで表示した時
body.facebook
  .content
    position: fixed
    top: 0

@media (max-width: 660px)
  .content
    width: 100%
    height: calc(100% - 100px)

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('global-nav', require('./global-nav.vue').default);

export default Vue.extend({
  methods: {
    linkUrl(default_path) {
      if(this.$route.params.index){
        return default_path+'/'+this.$route.params.index;
      }
      else {
        return default_path;
      }
    }
  }
});

</script>