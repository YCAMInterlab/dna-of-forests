<template lang="pug">

.root(v-bind:class="this.$root.$i18n.locale")
  #map
  aside
    h1
      imgr-sp.logo(:alt="TODO" src='top/logo.png' locale global)
    imgr-sp.lead(:alt="TODO" src='top/lead.png' locale global)
    nav
      router-link(v-bind:to="linkUrl('niho')") NIHO
      router-link(v-bind:to="linkUrl('kumano')") KUMANO
    footer
      a.ycam(:href="$t('panorama.ycam')" target="_blank")
        imgr(src="top/ycam-logo.png" alt="YCAM" global)
      p.copyright
        | Field Guide “DNA of Forests”
        br
        | by
        a(:href="$t('panorama.ycam')" target="_blank" style="margin-left: 0.4em;") Yamaguchi Center for Arts and Media [YCAM]
        br
        | is licensed under a
        br
        a(:href="$t('panorama.cc')" target="_blank") Creative Commons License CC BY-SA 4.0
  <lang-button-top class="lang round" />

</template>

<style lang="sass?indentedSyntax" scoped>

.lang
  position: absolute
  top: 30px
  right: 30px

aside
  position: relative
  float: left
  width: 260px
  height: calc(100% - 40px)
  margin: 20px
  display: flex
  flex-direction: column

h1
  width: 100%
  flex: 1
  .logo
    position: relative
    width: 100%
    height: 100%
    img
      position: absolute

.root.ja
  h1
    .logo
      img
        top: 50%
        left: 50%
        transform: translateY(-50%) translateX(-50%)
.root.en
  h1
    .logo
      img
        top: 50%
        transform: translateY(-50%)

.lead
  margin: 32px 0

footer
  height: 52px
  position: relative
  .ycam
    position: absolute
    bottom: 3px
    left: 0
    &:hover
      opacity: 0.7

  .copyright
    position: absolute
    right: 0
    font-family: 'Roboto'
    font-size: 9px
    line-height: 13px
    letter-spacing: 0
    text-align: right
    color: #4c4c4c
    // Chromeでは10px以下のフォントサイズが使えないので、その対応
    &.chrome
      line-height: 14px
      -webkit-transform: scale(0.9)
      -webkit-transform-origin: 100% 0
    a
      color: #4c4c4c
      text-decoration: none
      &:hover
        border-bottom: 1px dotted #4c4c4c

nav
  display: none
  a
    display: block
    color: #fff
    text-decoration: none
    font-size: 15px
    line-height: 2em

#map
  float: right
  width: calc(100% - 320px)
  height: calc(100% - 40px)
  background-color: #fff
  border-radius: 5px
  margin: 20px 20px 20px 0

@media (max-width: 660px)
  #map
    margin: 0
    width: 100%
    height: 552px
    clear: both
    float: none
  aside
    width: 100%
    display: block
  nav
    display: block

</style>

<script>

import Vue from 'vue';

// 登録
Vue.component('lang-button-top', require('../lang-button-top.vue').default);

export default Vue.extend({
  watch: {
    '$route': 'init'
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init() {

      if(document.querySelector('body').classList.contains('chrome')) {
        this.$el.querySelector('.copyright').classList.add('chrome');
      }

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
              title: `${b.title[locale]}をみる`,
              icon: `/dna-of-forests/img/top/markers/${_prop}-${locale}.png`
            });
            marker.addListener('click', function() {
              location.href = `#/${_prop}`;
            });
          }
        };

        var guides = {
          niho: {
            title: {
              ja: '仁保の森 2016',
              en: 'Forest of Niho 2016'
            },
            position: new google.maps.LatLng(34.2505833, 131.5789502)
          },
          kumano: {
            title: {
              ja: '熊野の森 2017',
              en: 'Forest of Kumano 2017',
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