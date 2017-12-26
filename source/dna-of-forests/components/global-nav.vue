<template lang="pug">

nav
  router-link.top(:to="linkUrl('/')" :exact="true")
    div
      span TOP
  router-link.panorama(:to="linkUrl('/panorama')")
    div
      span 360
  router-link.list(:to="linkUrl('/list')")
    div
      span LIST
  router-link.about(:to="linkUrl('/about')")
    div
      span ABOUT
  <sound-button />
  <lang-button class="lang" />

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
      margin-bottom: 2px


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
    &:nth-last-child(2)
      position: absolute
      bottom: 30px
      margin-bottom: 2px

  >.lang
      position: absolute
      height: 30px
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
      margin-right: 2px
      &:not(:last-child)
        margin-bottom: 0
      // sound
      &:nth-last-child(2)
        right: 50px
        bottom: 0
        margin-bottom: 0
        margin-right: 2px
    >.lang
      right: 0
      height: 100%


</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('sound-button', require('./sound-button.vue').default);
Vue.component('lang-button', require('./lang-button.vue').default);

export default Vue.extend({
  methods: {
    linkUrl(path) {
      const p = this.$route.params;
      if(['/panorama','/list'].includes(path) && p.index){
        return `/${p.forest}${path}/${p.index}`;
      }
      else {
        return `/${p.forest}${path}`;
      }
    }
  }
});

</script>