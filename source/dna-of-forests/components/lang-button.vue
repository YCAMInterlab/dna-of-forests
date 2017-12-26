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
      width: 39px
      margin-right: 1px
      >div
        background-image: url(/dna-of-forests/img/gnav/language-en@2x.png)
        background-size: auto 9px
      &:not([href])
        cursor: default
        >div
          opacity: 1
          background-image: url(/dna-of-forests/img/gnav/language-en-active@2x.png)
    &.ja
      width: 40px
      >div
        background-image: url(/dna-of-forests/img/gnav/language-ja@2x.png)
        background-size: auto 9px
      &:not([href])
        cursor: default
        >div
          opacity: 1
          background-image: url(/dna-of-forests/img/gnav/language-ja-active@2x.png)

  // round style (on global top)
  &.round
    a.en
      width: 45px
      border-top-left-radius: 30px
      border-bottom-left-radius: 30px
    a.ja
      width: 44px
      border-top-right-radius: 30px
      border-bottom-right-radius: 30px

@media (max-width: 660px)
  .buttons
    width: 50px
    height: 100%
    a
      float: none
      &.en
        width: 50px
        margin-right: 1px
        height: 49px
        margin-bottom: 1px
        >div
          background-image: url(/dna-of-forests/img/gnav/language-en@2x.png)
          background-size: auto 9px
        &:not([href])
          cursor: default
          >div
            opacity: 1
            background-image: url(/dna-of-forests/img/gnav/language-en-active@2x.png)
      &.ja
        width: 50px
        height: 50px
        >div
          background-image: url(/dna-of-forests/img/gnav/language-ja@2x.png)
          background-size: auto 9px
        &:not([href])
          cursor: default
          >div
            opacity: 1
            background-image: url(/dna-of-forests/img/gnav/language-ja-active@2x.png)
</style>

<script>

import Vue from 'vue';

export default Vue.extend({

  mounted: function() {
    this.changeRoute();
  },

  watch: {
    // ルートの変更を監視
    '$route': 'changeRoute'
  },

  methods: {
    changeRoute(){
      var en = this.$el.querySelector('.en');
      var ja = this.$el.querySelector('.ja');
      if(this.$root.$i18n.locale === 'en') {
        en.removeAttribute('href');
        ja.href = `/dna-of-forests/#${this.$route.path}`;
      }
      else {
        en.href = `/dna-of-forests/en/#${this.$route.path}`;
        ja.removeAttribute('href');
      }
    }
  }
});

</script>