<template lang="pug">

a

</template>

<style lang="sass?indentedSyntax" scoped>

a
  display: block
  background-position: center
  background-repeat: no-repeat
  transition-duration: 0.2s
  opacity: 0.5
  &:hover
    opacity: 0.9
  &.en
    background-image: url(/dna-of-forests/img/gnav/language-en@2x.png)
    background-size: 41px 8px
  &.ja
    background-image: url(/dna-of-forests/img/gnav/language-ja@2x.png)
    background-size: 47px 8px

</style>

<script>

import Vue from 'vue';

export default Vue.extend({

  mounted: function() {
    this.$el.className = (this.$root.$i18n.locale === 'en') ? 'ja' : 'en';
    this.changeRoute();
  },

  watch: {
    // ルートの変更を監視
    '$route': 'changeRoute'
  },

  methods: {
    changeRoute(){
      var _root = (this.$root.$i18n.locale === 'en') ? '/dna-of-forests/' : '/dna-of-forests/en/';
      this.$el.href = _root+'#'+this.$route.path;
    }
  }
});

</script>