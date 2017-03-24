<template lang="pug">

nav
  router-link.top(to='/' v-bind:exact="true")
    div
      span TOP
  router-link.panorama(v-bind:to="linkUrl('/panorama')")
    div
      span 360
  router-link.list(v-bind:to="linkUrl('/list')")
    div
      span LIST
  router-link.about(to='/about')
    div
      span ABOUT
  <sound-button>

</template>

<style lang="sass?indentedSyntax" scoped>

nav
  position: relative
  background: #000
  width: 80px
  height: 100%
  float: left
  >a
    display: block
    width: 80px
    height: 80px
    background-color: #0d0d0d
    cursor: pointer
    &:not(:last-child)
      margin-bottom: 1px


    >div
      height: 100%
      background-position: center
      background-repeat: no-repeat
      transition-duration: 0.2s
      >span
        display: none
    &:not(.router-link-active)
      >div
        opacity: 0.5
      &:hover
        >div
          opacity: 0.9

    &.top
      >div
        background-image: url(/dna-of-forests/img/gnav/top@2x.png)
        background-size: 21px 32px
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/top-active@2x.png)
    &.panorama
      >div
        background-image: url(/dna-of-forests/img/gnav/panorama@2x.png)
        background-size: 20px 34px
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/panorama-active@2x.png)
    &.list
      >div
        background-image: url(/dna-of-forests/img/gnav/list@2x.png)
        background-size: 20px 27px
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/list-active@2x.png)
    &.about
      >div
        background-image: url(/dna-of-forests/img/gnav/about@2x.png)
        background-size: 34px 34px
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/about-active@2x.png)

    // sound
    &:last-child
      position: absolute
      bottom: 0

@media (max-width: 660px)
  nav
    position: fixed
    bottom: 0
    height: 100px
    width: 100%
    float: none
    z-index: 9999
    >a
      width: 100px
      height: 100px
      float: left
      &:not(:last-child)
        margin-bottom: 0
      // sound
      &:last-child
        right: 0


</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('sound-button', require('./sound-button.vue'));

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