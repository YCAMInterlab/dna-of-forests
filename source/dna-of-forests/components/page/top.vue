<template lang="pug">

.root(:class="this.$root.$i18n.locale" v-resize:debounce.500="init")
  #map
  aside
    h1
      //- imgにwidth:100%のスタイルを当てたいのでimgr-spは使えなかった
      template(v-if="this.$root.$i18n.locale=='ja'")
        imgr.logo.pc.ja(:alt="$t('top.logo')" src="top/logo-ja-pc.png" global)
        imgr.logo.sp.ja(:alt="$t('top.logo')" src="top/logo-ja-sp.png" global)
      template(v-else)
        imgr.logo.pc.en(:alt="$t('top.logo')" src="top/logo-en-pc.png" global)
        imgr.logo.sp.en(:alt="$t('top.logo')" src="top/logo-en-sp.png" global)
    .lead
      //- imgにwidth:100%のスタイルを当てたいのでimgr-spは使えなかった
      template(v-if="this.$root.$i18n.locale=='ja'")
        imgr.pc(:alt="$t('top.lead')" src="top/lead-ja-pc.png" global)
        imgr.sp(:alt="$t('top.lead')" src="top/lead-ja-sp.png" global)
      template(v-else)
        imgr.pc(:alt="$t('top.lead')" src="top/lead-en-pc.png" global)
        imgr.sp(:alt="$t('top.lead')" src="top/lead-en-sp.png" global)
    nav
      h2
        imgr(:alt="$t('top.index')" src='top/title-guides.png' locale global)
      .links
        router-link(:to="linkUrl('chuo-park')" style="background-color: #29e55f")
          imgr(alt='chuo-park' src='top/guides/chuo-park/list.png' locale global)
        router-link(:to="linkUrl('kumano')" style="background-color: #ff33a5")
          imgr(alt='kumano' src='top/guides/kumano/list.png' locale global)
        router-link(:to="linkUrl('niho')" style="background-color: #337eff")
          imgr(alt='niho' src='top/guides/niho/list.png' locale global)
    footer
      a.ycam(:href="$t('panorama.ycam')" target="_blank")
        imgr-sp(src="top/ycam-logo.png" alt="YCAM" global)
      p.copyright
        | Field Guide “DNA of Forests”
        br
        | by
        a(:href="$t('panorama.ycam')" target="_blank" style="margin-left: 0.4em;") Yamaguchi Center for Arts and Media [YCAM]
        br
        | is licensed under a
        br
        a(:href="$t('panorama.cc')" target="_blank") Creative Commons License CC BY-SA 4.0
  <lang-button-top class="lang" />

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

h1
  width: 100%
  position: relative
  .logo
    position: absolute

.root
  -webkit-overflow-scrolling: touch

.root.ja
  h1
    height: calc(100% - 197px)
    .logo
      top: 50%
      left: 50%
      transform: translateY(-50%) translateX(-50%)
.root.en
  h1
    height: calc(100% - 197px)
    .logo
      top: 50%
      transform: translateY(-50%)

.lead
  position: absolute
  bottom: 84px

footer
  height: 52px
  width: 100%
  position: absolute
  bottom: 0
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
  .root
    overflow: auto
  #map
    margin: 0
    width: 100%
    height: 604px
    border-radius: 0
    clear: both
    float: none
  .lang
    right: default
    top: 15px
    left: 15px
  aside
    width: calc(100% - 60px)
    margin: 30px
    height: auto
    display: block
  .root.en
    h1
      height: 265px
  .root.ja
    #map
      height: 553px
    h1
      height: 365px
  .logo.en
    width: 100%
    max-width: 570px
  .lead
    position: relative
    bottom: inherit
    margin-bottom: 100px
    >img
      width: 100%
  nav
    display: block
    margin-bottom: 100px
    h2
      margin-bottom: 40px
    a
      display: block
      padding: 58px 34px
      margin-bottom: 15px
      background-image: url(/dna-of-forests/img/top/list-icon.png)
      background-repeat: no-repeat
      background-position: right 38px center
  footer
    position: relative
    height: auto
    .ycam
      position: relative
      float: left
    .copyright
      position: relative
      float: right
      font-size: 15px
      line-height: 22px
      // Chromeでは10px以下のフォントサイズが使えないので、その対応
      &.chrome
        line-height: 22px

</style>

<script>

import Vue from 'vue';
import resize from 'vue-resize-directive';

// 登録
Vue.component('lang-button-top', require('../lang-button-top.vue').default);

export default Vue.extend({
  directives: {
    resize
  },
  mounted: function(){
    this.init();
  },
  methods: {
    init() {

      // chromeで10pxより小さい文字が使えない問題対策
      if(document.querySelector('body').classList.contains('chrome')) {
        this.$el.querySelector('.copyright').classList.add('chrome');
      }
      // SP判定
      const isSP = this.$el.querySelector('nav').offsetParent != null;

      if( this.$route.path == '/') {
        var mapOptions = {
          mapTypeId: 'satellite',
          disableDefaultUI: true,
          type: false,
          zoomControl: false
        };

        const map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const guides = {
          'niho': {
            title: {
              ja: '仁保の森 2016',
              en: 'Forest of Niho 2016'
            },
            position: new google.maps.LatLng(34.2505833, 131.5789502)
          },
          'kumano': {
            title: {
              ja: '熊野の森 2017',
              en: 'Forest of Kumano 2017',
            },
            position: new google.maps.LatLng(34.170286, 131.461427)
          },
          'chuo-park': {
            title: {
              ja: '中央公園 2018',
              en: 'Chuo Park 2018',
            },
            position: new google.maps.LatLng(34.169894, 131.466662)
          }
        };

        const locale = location.pathname == '/dna-of-forests/' ? 'ja' : 'en';

        for(var _prop in guides) {
          var b = guides[_prop];
          // SPの時
          const icon_img = isSP ? `marker-sp.png` : `marker-${locale}-pc.png`;
          var marker = new google.maps.Marker({
            name: _prop,
            position: b.position,
            map: map,
            title: `${b.title[locale]}をみる`,
            icon: `/dna-of-forests/img/top/guides/${_prop}/${icon_img}`
          });
          marker.addListener('click', function(e) {
            location.href = `#/${this.name}`;
          });
        }
        // 表示領域の調整
        var bounds = new google.maps.LatLngBounds();
        for(var prop in guides) {
          bounds.extend (guides[prop].position);
        }
        map.fitBounds(bounds);
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