<template lang="pug">

img

</template>

<script>

import Vue from 'vue';

export default Vue.extend({
  props: ['alt','src','locale'],
  watch: {
    src: 'setAttrs'
  },
  methods: {
    setAttrs() {
      this.$el.alt = this.alt;
      // 相対パスを絶対パスに
      var _src = '/dna-of-forests/img/'+this.src;
      if(this.locale){
        // locale属性があれば、言語毎に画像パスを切り替え
        this.$el.src = _src.replace(/(\.\w+)$/, '-'+this.$root.$i18n.locale+'$1');
        this.$el.srcset = _src.replace(/(\.\w+)$/, '-'+this.$root.$i18n.locale+'@2x$1')+' 2x';
      }
      else{
        this.$el.src = _src;
        this.$el.srcset = _src.replace(/(\.\w+)$/, '@2x$1')+' 2x';
      }
    }
  },
  mounted: function(){
    this.setAttrs();
  }
});

</script>