<template lang="pug">

.buttons
  a.en
    div
  a.ja
    div

</template>

<style lang="sass?indentedSyntax" scoped>

.buttons
  a
    display: block
    float: left
    height: 30px
    background-color: #0d0d0d
    >div
      height: 100%
      background-position: center
      background-repeat: no-repeat
      transition-duration: 0.2s
      opacity: 0.5
    &:hover
      >div
        opacity: 0.9
    &.en
      width: 45px
      border-top-left-radius: 30px
      border-bottom-left-radius: 30px
      border-right: 1px solid #1a1a1a
      >div
        background-image: url(/dna-of-forests/img/top/lang-button-top/language-en-pc@2x.png)
        background-size: auto 9px
      &:not([href])
        cursor: default
        >div
          opacity: 1
          background-image: url(/dna-of-forests/img/top/lang-button-top/language-en-active-pc@2x.png)
    &.ja
      width: 44px
      border-top-right-radius: 30px
      border-bottom-right-radius: 30px
      >div
        background-image: url(/dna-of-forests/img/top/lang-button-top/language-ja-pc@2x.png)
        background-size: auto 9px
      &:not([href])
        cursor: default
        >div
          opacity: 1
          background-image: url(/dna-of-forests/img/top/lang-button-top/language-ja-active-pc@2x.png)

@media (max-width: 660px)
  .buttons
    width: 162px
    height: 100%
    a
      &.en
        width: 80px
        height: 60px
        border-right: 2px solid #1a1a1a
        margin: 0
        >div
          background-image: url(/dna-of-forests/img/top/lang-button-top/language-en-sp@2x.png)
          background-size: auto 18px
          background-position: 31px center
        &:not([href])
          cursor: default
          >div
            opacity: 1
            background-image: url(/dna-of-forests/img/top/lang-button-top/language-en-active-sp@2x.png)
      &.ja
        width: 80px
        height: 60px
        >div
          background-image: url(/dna-of-forests/img/top/lang-button-top/language-ja-sp@2x.png)
          background-size: auto 18px
          background-position: 22px center
        &:not([href])
          cursor: default
          >div
            opacity: 1
            background-image: url(/dna-of-forests/img/top/lang-button-top/language-ja-active-sp@2x.png)
</style>

<script>

import Vue from 'vue';

export default Vue.extend(require('./lang-button.vue').default);

</script>