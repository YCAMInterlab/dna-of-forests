<template lang="pug">

component(:is="currentView")

</template>

<script>

import Vue from 'vue';

export default Vue.extend({
  // TODO URLを書き換えた時に再読み込みされないのをなんとかしたい
  // 例：/#/niho/about → /#/kumano/about
  data: function(){
    return {
      currentView: this.$route.params.forest
    };
  },
  // TODO 自動的に増えるようにしたい
  components: {
    'niho':   require('../../niho/components/about.vue').default,
    'kumano': require('../../kumano/components/about.vue').default,
    'chuo-park': require('../../chuo-park/components/about.vue').default
  }
});

</script>