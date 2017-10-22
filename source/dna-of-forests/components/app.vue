<template lang="pug">

.root
  div.content('v-if'="$route.params.forest")
    <global-nav />
    router-view.guide-content
    transition(name='fade')
      detail-drawer('v-if'="$route.params.index")
  div.content('v-else')
    nav
      router-link(v-bind:to="linkUrl('niho')") NIHO
      router-link(v-bind:to="linkUrl('kumano')") KUMANO
    #map

</template>

<style lang="sass?indentedSyntax" scoped>

.root
  position: relative
  height: 100%
  min-height: 100%
  width: 100%
  overflow: hidden

.content
  height: 100%
  min-height: 100%
  width: 100%

.guide-content
  width: calc(100% - 80px)
  float: left
  height: 100%
  overflow: hidden
  background-color: #000
  position: relative
  // ↓これがないとiOS Safariで慣性スクロールが有効化されない
  -webkit-overflow-scrolling: touch

// Facebookアプリで表示した時
body.facebook
  .guide-content
    position: fixed
    top: 0

nav
  float: left
  width: 200px
  height: 100%
  a
    display: block
    color: #fff
    text-decoration: none
    font-size: 15px
    line-height: 2em
#map
  float: left
  width: calc(100% - 200px)
  height: 100%
  background-color: #fff

@media (max-width: 660px)
  .content
    width: 100%
    height: calc(100% - 100px)

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('global-nav', require('./global-nav.vue').default);

export default Vue.extend({
  watch: {
    '$route': 'init'
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init() {
      if( this.$route.path == '/') {
        var mapOptions = {
          mapTypeId: 'satellite',
          disableDefaultUI: true,
          type: false,
          zoomControl: false
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        map.setTilt(45);

        var initMap = function(guides, locale){
          // 表示領域の調整
          var bounds = new google.maps.LatLngBounds();
          for(var prop in guides) {
            bounds.extend (guides[prop].position);
          }
          map.fitBounds (bounds);


          for(var _prop in guides) {
            var b = guides[_prop];
            var marker = new google.maps.Marker({
              position: b.position,
              map: map,
              title: b.title[locale],
              icon: '/dna-of-forests/img/top/marker-'+_prop+'-'+locale+'.png'
            });
            marker.addListener('click', function() {
              location.href = b.link[locale];
            });
          }
        };

        var guides = {
          niho: {
            title: {
              ja: '仁保の森 2016',
              en: 'Forest of Niho 2016'
            },
            link: {
              ja: '/dna-of-forests/niho/',
              en: '/dna-of-forests/niho/en/'
            },
            position: new google.maps.LatLng(34.2505833, 131.5789502)
          },
          kumano: {
            title: {
              ja: '熊野の森 2017',
              en: 'Forest of Kumano 2017',
            },
            link: {
              ja: '/dna-of-forests/kumano/',
              en: '/dna-of-forests/kumano/en/'
            },
            position: new google.maps.LatLng(34.170286, 131.461427)
          }
        };

        const locale = location.pathname == '/dna-of-forests/' ? 'ja' : 'en';
        initMap(guides, locale);
      }
    },
    linkUrl(default_path) {
      if(this.$route.params.index){
        return default_path+'/'+this.$route.params.index;
      }
      else {
        return default_path;
      }
    }
  }
});

</script>