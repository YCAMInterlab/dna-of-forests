<template lang="pug">

a(v-on:click="click")
  div
    span SOUND
  audio(loop)
    source(src='./sound/forest.mp3' type='audio/mp3')

</template>

<style lang="sass?indentedSyntax" scoped>

a
  >div
    height: 100%
    background-position: center
    background-repeat: no-repeat
    background-image: url(/dna-of-forests/img/gnav/sound-on.png)
    transition-duration: 0.2s
    opacity: 0.5
    >span
      display: none

  &:hover
    >div
      opacity: 0.9

  &.off
    >div
      background-image: url(/dna-of-forests/img/gnav/sound-off.png)

</style>

<script>

import Vue from 'vue';
import MobileDetect from 'mobile-detect';
import Cookies from 'js-cookie';

export default Vue.extend({

  mounted: function() {

    var md = new MobileDetect(window.navigator.userAgent);

    this.sound = this.$el.querySelector('audio');
    this.sound.volume = 0.3;

    this.toggleSound(!(md.mobile() || parseInt(Cookies.get('isSoundOn'),10)==0));
  },

  methods: {
    click(){
      this.toggleSound(this.$el.className === 'off');
    },
    toggleSound(_on){
      if(_on){
        this.sound.play();
        Cookies.set('isSoundOn', 1);
        this.$el.className = '';
      }
      else {
        this.sound.pause();
        Cookies.set('isSoundOn', 0);
        this.$el.className = 'off';
      }
    }
  }
});

</script>