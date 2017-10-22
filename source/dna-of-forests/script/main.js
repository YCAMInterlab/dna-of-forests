// var ua = navigator.userAgent;
// if((ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
//   // do nothing
// }
// else if((ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)){
//   // TODO 正規表現でwidthだけ変える
//   document.querySelector('head>meta[name="viewport"]').setAttribute('content','width=1050');
// }

// var mapOptions = {
//   mapTypeId: 'satellite',
//   disableDefaultUI: true,
//   type: false,
//   zoomControl: false
// };
// var map = new google.maps.Map(document.getElementById('map'), mapOptions);
// map.setTilt(45);

// var initMap = function(guides, locale){
//   // 表示領域の調整
//   var bounds = new google.maps.LatLngBounds();
//   for(var prop in guides) {
//     bounds.extend (guides[prop].position);
//   }
//   map.fitBounds (bounds);


//   for(var _prop in guides) {
//     var b = guides[_prop];
//     var marker = new google.maps.Marker({
//       position: b.position,
//       map: map,
//       title: b.title[locale],
//       icon: '/dna-of-forests/img/top/marker-'+_prop+'-'+locale+'.png'
//     });
//     marker.addListener('click', function() {
//       location.href = b.link[locale];
//     });
//   }
// };

// var guides = {
//   niho: {
//     title: {
//       ja: '仁保の森 2016',
//       en: 'Forest of Niho 2016'
//     },
//     link: {
//       ja: '/dna-of-forests/niho/',
//       en: '/dna-of-forests/niho/en/'
//     },
//     position: new google.maps.LatLng(34.2505833, 131.5789502)
//   },
//   kumano: {
//     title: {
//       ja: '熊野の森 2017',
//       en: 'Forest of Kumano 2017',
//     },
//     link: {
//       ja: '/dna-of-forests/kumano/',
//       en: '/dna-of-forests/kumano/en/'
//     },
//     position: new google.maps.LatLng(34.170286, 131.461427)
//   }
// };

// const locale = location.pathname == '/dna-of-forests/' ? 'ja' : 'en';
// initMap(guides, locale);

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import MobileDetect from 'mobile-detect';
import _ from 'lodash';
import AppGuide from '../components/app-guide.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

var userAgent = window.navigator.userAgent.toLowerCase();
if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
  var isIE = true;
  // var ieVersion = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
  // ieVersion = parseInt(ieVersion);
}
// else {
//   var isIE = false;
// }

// Facebook InApp Browser
if(userAgent.indexOf('fban/fbios;fbav') != -1){
  document.querySelector('body').className += ' facebook';
  // 下記でスクロールをOFFにできるが、サイト全体に影響してしまう
  // $(window).on('touchmove.noScroll', function(e) {
  //   e.preventDefault();
  // });
  // スクロール復活
  // $(window).off('.noScroll');
}

var ua = navigator.userAgent;
if(!isIE && (ua.indexOf('Edge') < 0) && (!new MobileDetect(window.navigator.userAgent).mobile())) {
  var video = document.createElement('video');
  video.id = 'video';
  video.src = '/dna-of-forests/niho/img/panorama/forest.mp4';
  video.autoplay = true;
  video.loop = true;
  video.style.display = 'none';
  document.body.appendChild(video);
}

// iPhoneでLandscapeにした時に見にくくなるのを何とかする
var setViewportByOrientation = function(){
  var vp = document.querySelector('head>meta[name="viewport"]');
  switch (window.orientation) {
  case 0:
  case 180:
    // Portrait
    vp.content = 'width=640';
    break;
  case -90:
  case 90:
    // Landscape
    vp.content = 'width=1320';
    break;
  }
};

if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
  setViewportByOrientation();
  window.addEventListener('orientationchange', setViewportByOrientation);
}
else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
  // TODO 正規表現でwidthだけ変える
  var vp = document.querySelector('head>meta[name="viewport"]');
  vp.content = 'width=1150';
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('../components/app-guide.vue').default
    },
    {
      path: '/:forest',
      component: require('../components/page/panorama.vue').default,
      children: [
        { path: 'panorama',        component: require('../components/page/panorama.vue').default },
        { path: 'panorama/:index', component: require('../components/page/panorama.vue').default },
        { path: 'list',            component: require('../components/page/list.vue').default },
        { path: 'list/:index',     component: require('../components/page/list.vue').default },
        { path: 'about',           component: require('../niho/components/page/about.vue').default }
      ]
    }
  ]
});

// 登録
Vue.component('detail-drawer', require('../components/detail-drawer.vue').default);
Vue.component('global-nav', require('../components/global-nav.vue').default);
Vue.component('imgr', require('../components/imgr.vue').default);

new AppGuide({
  router: router,
  i18n: new VueI18n({
    locale: document.querySelector('html').getAttribute('lang'),
    messages: require('../niho/script/messages.json')
  }),
  data: function(){
    // isAlreadyDraggedを追加する
    var _data = _.cloneDeep(require('../niho/script/markers.json'));
    _data['isAlreadyDragged'] = false;
    return _data;
  }
}).$mount('#app');
