<template lang="pug">

a(v-on:click="click")
  div
    span SOUND
  audio(loop)
    source(:src='soundUrl()' type='audio/mp3')

</template>

<style lang="sass?indentedSyntax" scoped>

a
  >div
    height: 100%
    background-position: center
    background-repeat: no-repeat
    background-image: url(/dna-of-forests/img/gnav/sound-on@2x.png)
    background-size: 18px 15px
    transition-duration: 0.2s
    opacity: 0.5
    >span
      display: none

  &:hover
    >div
      opacity: 0.9

  &.off
    >div
      background-image: url(/dna-of-forests/img/gnav/sound-off@2x.png)
      background-size: 17px 15px

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

    if(md.mobile()){
      // モバイルのときだけ、ウィンドウが背面にいくとサウンド停止（戻ってくると復帰）
      window.addEventListener('blur', ()=> {
        if(!this.sound.paused){
          this.pauseByWindowBlur = true;
          this.toggleSound(false);
        }
        else{
          this.pauseByWindowBlur = false;
        }
      }, false);
      window.addEventListener('focus', ()=> {
        if(this.pauseByWindowBlur){
          this.toggleSound(true);
        }
      }, false);
    }

    // Safari changed its specification that playing sound needs user action, so set default off.
    this.toggleSound( !document.querySelector('body.safari') && (!(md.mobile() || parseInt(Cookies.get('isSoundOn'),10)==0)));
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
    },
    soundUrl(){
      return `/dna-of-forests/${this.$route.params.forest}/sound/forest.mp3`;
    }
  },
  data: function(){
    return {
      pauseByWindowBlur: false
    };
  }
});

</script>