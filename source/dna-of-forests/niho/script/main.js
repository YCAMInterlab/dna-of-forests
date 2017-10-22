import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import MobileDetect from 'mobile-detect';
import _ from 'lodash';
import DetailDrawer from '../components/detail-drawer.vue';
import GlobalNav from '../../components/global-nav.vue';
import Imgr from '../components/imgr.vue';
import AppGuide from '../../components/app-guide.vue';

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
    { path: '/',                component: require('../components/page/panorama.vue').default },
    { path: '/panorama',        component: require('../components/page/panorama.vue').default },
    { path: '/panorama/:index', component: require('../components/page/panorama.vue').default },
    { path: '/list',            component: require('../../components/page/list.vue').default },
    { path: '/list/:index',     component: require('../../components/page/list.vue').default },
    { path: '/about',           component: require('../components/page/about.vue').default },
  ]
});

// 登録
Vue.component('detail-drawer', DetailDrawer);
Vue.component('global-nav', GlobalNav);
Vue.component('imgr', Imgr);

new AppGuide({
  router: router,
  i18n: new VueI18n({
    locale: document.querySelector('html').getAttribute('lang'),
    messages: require('./messages.json')
  }),
  data: function(){
    // isAlreadyDraggedを追加する
    var _data = _.cloneDeep(require('./markers.json'));
    _data['isAlreadyDragged'] = false;
    _data['forestId'] = 'niho';
    return _data;
  }
}).$mount('#app');
