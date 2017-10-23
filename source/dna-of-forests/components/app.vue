<template lang="pug">

router-view.root

</template>

<style lang="sass?indentedSyntax" scoped>

.root
  position: relative
  height: 100%
  min-height: 100%
  width: 100%
  overflow: hidden

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('global-nav', require('./global-nav.vue').default);

export default Vue.extend({
  mounted: function(){
    console.log('mounted');
  }
});

</script>