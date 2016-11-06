<template lang="pug">

nav
  router-link.panorama(to='/panorama')
    div
      span 360
  router-link.list(to='/list')
    div
      span LIST
  router-link.about(to='/about')
    div
      span ABOUT
  <sound-button></sound-button>

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
    width: 100%
    height: 80px
    background-color: #0d0d0d
    margin-bottom: 2px
    cursor: pointer

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

    &.panorama
      >div
        background-image: url(/dna-of-forests/img/gnav/panorama.png)
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/panorama-active.png)
    &.list
      >div
        background-image: url(/dna-of-forests/img/gnav/list.png)
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/list-active.png)
    &.about
      >div
        background-image: url(/dna-of-forests/img/gnav/about.png)
      &.router-link-active
        >div
          background-image: url(/dna-of-forests/img/gnav/about-active.png)

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('sound-button', require('./sound-button.vue'));


// export default Vue.extend({

// });

</script>