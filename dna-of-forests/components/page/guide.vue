<template lang="pug">

.root
  <global-nav />
  router-view.guide-content(:markers="markers" :config="config")
  transition(name='fade')
    detail-drawer(:markers="markers" v-bind:initial_data="initial_data" v-if="$route.params.index")

</template>

<style lang="sass?indentedSyntax" scoped>

.root
  position: relative
  height: 100%
  min-height: 100%
  width: 100%
  overflow: hidden

.guide-content
  width: calc(100% - 80px)
  float: left
  height: 100%
  background-color: #000
  position: relative
  // ↓これがないとiOS Safariで慣性スクロールが有効化されない
  -webkit-overflow-scrolling: touch

// Facebookアプリで表示した時
body.facebook
  .guide-content
    position: fixed
    top: 0

@media (max-width: 660px)
  .guide-content
    width: 100%
    height: calc(100% - 100px)

</style>

<script>

import Vue from 'vue';
import _ from 'lodash';
import util from '../../script/util';

// 登録
Vue.component('global-nav', require('../global-nav.vue').default);

export default Vue.extend({
  data: function(){

    // Create the initial data object which has whole keys that markers have
    var merged = {}; // All keys are merged into this object
    _.each(['niho','kumano'], (forest)=>{
      var marker_data = require(`../../${forest}/markers.json`);
      var markers = marker_data.knowledges.concat(marker_data.samples);
      _.each(markers, (o) =>{
        _.merge(merged, JSON.parse(JSON.stringify(o)));
      });
    });
    merged['type'] = null; // Add 'type'

    return {
      initial_data: util.initWithNullValue(merged),
      markers: require(`../../${this.$route.params.forest}/markers.json`),
      config: _.merge(
        require(`../../config.json`),
        require(`../../${this.$route.params.forest}/config.json`)
      )
    };
  }
});

</script>