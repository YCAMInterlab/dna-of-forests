<template lang="pug">

div
  img.pc
  img.sp

</template>

<style lang="sass?indentedSyntax">

img.sp
  display: none

@media (max-width: 660px)
  img.pc
    display: none
  img.sp
    display: inherit

</style>

<script>

// PC,SP で画像を切替えたい場合にimgrの代わりに使用

import Vue from 'vue';

export default Vue.extend({
  props: ['alt','src','locale','global'],
  watch: {
    src: 'setAttrs'
  },
  methods: {
    setAttrs() {
      this.$el.alt = this.alt;
      const devices = ['pc','sp'];
      for(var i in devices) {

        const el = this.$el.querySelector('.'+devices[i]);

        // 相対パスを絶対パスに（globalがついていたらルートのimgフォルダを読みに行く）
        const _src = this.global ? `/dna-of-forests/img/${this.src}` : `/dna-of-forests/${this.$route.params.forest}/img/${this.src}`;

        // locale属性があれば、言語毎に画像パスを切り替え
        const _locale = this.locale ? '-'+this.$root.$i18n.locale : '';

        el.src    = _src.replace(/(\.\w+)$/, _locale+'-'+devices[i]+'$1');
        el.srcset = _src.replace(/(\.\w+)$/, _locale+'-'+devices[i]+'@2x$1')+' 2x';
      }
    }
  },
  mounted: function(){
    this.setAttrs();
  }
});

</script>
