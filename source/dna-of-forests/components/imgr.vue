<template lang="pug">

img

</template>

<script>

import Vue from 'vue';

export default Vue.extend({
  props: ['alt','src','locale','global'],
  watch: {
    src: 'setAttrs'
  },
  methods: {
    setAttrs() {
      this.$el.alt = this.alt;

      // 相対パスを絶対パスに（globalがついていたらルートのimgフォルダを読みに行く）
      const _src = this.global ? `/dna-of-forests/img/${this.src}` : `/dna-of-forests/${this.$route.params.forest}/img/${this.src}`;

      // locale属性があれば、言語毎に画像パスを切り替え
      const _locale = this.locale ? '-'+this.$root.$i18n.locale : '';

      this.$el.src    = _src.replace(/(\.\w+)$/, _locale+'$1');
      this.$el.srcset = _src.replace(/(\.\w+)$/, _locale+'@2x$1')+' 2x';
    }
  },
  mounted: function(){
    this.setAttrs();
  }
});

</script>