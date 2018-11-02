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

// Marker Style ================

@function sqrt($r)
  $x0: 1
  $x1: $x0
  @for $i from 1 through 10
    $x1: $x0 - ($x0 * $x0 - abs($r)) / (2 * $x0)
    $x0: $x1
  @return $x1
$pinWidth: 100px
$pinHeight: 113px
$pinHeightFactor: ((1 + sqrt(2))/2)
$pinColor: #f93c11
$shadow-size: 50px
.pin-wrap
  position: absolute
  width: $pinWidth
  height: $pinHeight
  margin-top: -$pinHeight
  margin-left: -$pinWidth/2
  transform-origin: 50% ($pinHeightFactor * 100%) 0

.pin
  position: absolute
  top: 50%
  left: 50%
  width: $pinWidth
  height: $pinHeight
  margin-top: -$pinHeight/2
  margin-left: -$pinWidth/2
  transform-origin: 50% ($pinHeightFactor * 100%) 0
  background-size: $pinWidth $pinHeight


.shadow
  position: absolute

.shadow::after
  position: absolute
  left: -100px - $shadow-size/2
  display: block
  width: $shadow-size
  height: $shadow-size
  margin-top: -$shadow-size/2
  content: ''
  transform: rotateX(55deg)
  border-radius: 50%
  box-shadow: rgba(0, 0, 0, .4) 100px 0 20px

</style>

<script>

import dynamics from 'dynamics.js'
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
            position: new google.maps.LatLng(34.2505833, 131.5789502),
            zIndex: 1
          },
          'kumano': {
            title: {
              ja: '熊野の森 2017',
              en: 'Forest of Kumano 2017',
            },
            position: new google.maps.LatLng(34.170286, 131.461427),
            zIndex: 1
          },
          'chuo-park': {
            title: {
              ja: '中央公園 2018',
              en: 'Chuo Park 2018',
            },
            position: new google.maps.LatLng(34.169894, 131.466662),
            zIndex: 1
          }
        };

        const locale = location.pathname == '/dna-of-forests/' ? 'ja' : 'en';
        const scopeId = this.$options._scopeId;

        // CustomMaker ------>
        CustomMarker.prototype = new google.maps.OverlayView();
        function CustomMarker(opts) {
          this.setValues(opts);
        }
        CustomMarker.prototype.draw = function() {
          var self = this;
          var div = this.div;
          if (!div) {
            function htmlToElement(html) {
              var template = document.createElement('template');
              html = html.trim(); // Never return a text node of whitespace as the result
              template.innerHTML = html;
              return template.content.firstChild;
            }
            div = this.div = htmlToElement(`
              <div ${scopeId}>
                <div ${scopeId} class="shadow"></div>
                <div ${scopeId} class="pulse"></div>
                <div ${scopeId} class="pin-wrap">
                  <div ${scopeId} class="pin" style="background-image: url(${this.icon})"></div>
                </div>
              </div>
              `);
            this.pinWrap = this.div.getElementsByClassName('pin-wrap');
            this.pin = this.div.getElementsByClassName('pin');
            this.pinShadow = this.div.getElementsByClassName('shadow');
            div.style.position = 'absolute';
            div.style.cursor = 'pointer';
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
            google.maps.event.addDomListener(div, 'click', (e)=> {
              location.href = this.link;
            });
            google.maps.event.addDomListener(div, 'mouseover', function(e) {
              this.style.zIndex = 10;
              self.animateBounce();
            });
            google.maps.event.addDomListener(div, 'mouseout', function(e) {
              this.style.zIndex = 1;
            });
          }
          var point = this.getProjection().fromLatLngToDivPixel(this.position);
          if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
          }
        }
        CustomMarker.prototype.animateBounce = function() {
          dynamics.stop(this.pinWrap);
          dynamics.css(this.pinWrap, {
            transform: 'none',
          });
          dynamics.animate(this.pinWrap, {
            translateY: -30
          }, {
            type: dynamics.forceWithGravity,
            bounciness: 0,
            duration: 500,
            delay: 150,
          });

          dynamics.stop(this.pin);
          dynamics.css(this.pin, {
            transform: 'none',
          });
          dynamics.animate(this.pin, {
            scaleY: 0.8
          }, {
            type: dynamics.bounce,
            duration: 800,
            bounciness: 0,
          });
          dynamics.animate(this.pin, {
              scaleY: 0.8
          }, {
            type: dynamics.bounce,
            duration: 800,
            bounciness: 600,
            delay: 650,
          });
          dynamics.stop(this.pinShadow);
          dynamics.css(this.pinShadow, {
            transform: 'none',
          });
          dynamics.animate(this.pinShadow, {
            scale: 0.6,
          }, {
            type: dynamics.forceWithGravity,
            bounciness: 0,
            duration: 500,
            delay: 150,
          });
        }
        // ------> CustomMaker

        for(var _prop in guides) {
          var b = guides[_prop];
          // SPの時
          const icon_img = isSP ? `marker-sp@2x.png` : `marker-${locale}-pc@2x.png`;
          var marker = new CustomMarker({
            name: _prop,
            position: b.position,
            map: map,
            title: `${b.title[locale]}をみる`,
            icon: `/dna-of-forests/img/top/guides/${_prop}/${icon_img}`,
            link: `#/${_prop}`
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