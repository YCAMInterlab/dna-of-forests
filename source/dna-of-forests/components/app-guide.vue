<template lang="pug">

.root
  div.content('v-if'="$route.params.forest")
    <global-nav />
    router-view.guide-content
    transition(name='fade')
      detail-drawer('v-if'="$route.params.index")
  div.content('v-else')
    nav
      router-link(v-bind:to="linkUrl('niho')") NIHO
      router-link(v-bind:to="linkUrl('kumano')") KUMANO
    #map

</template>

<style lang="sass?indentedSyntax" scoped>

.root
  position: relative
  height: 100%
  min-height: 100%
  width: 100%
  overflow: hidden

.content
  height: 100%
  min-height: 100%
  width: 100%

.guide-content
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
  .guide-content
    position: fixed
    top: 0

nav
  float: left
  width: 200px
  height: 100%
  a
    display: block
    color: #fff
    text-decoration: none
    font-size: 15px
    line-height: 2em
#map
  float: left
  width: calc(100% - 200px)
  height: 100%
  background-color: #fff

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