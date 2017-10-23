import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import _ from 'lodash';
import AppGuide from '../components/app.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

var userAgent = window.navigator.userAgent.toLowerCase();

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
      component: require('../components/page/top.vue').default
    },
    {
      path: '/:forest/',
      component: require('../components/page/guide.vue').default,
      children: [
        { path: '',                component: require('../components/page/guide/panorama.vue').default },
        { path: 'panorama',        component: require('../components/page/guide/panorama.vue').default },
        { path: 'panorama/:index', component: require('../components/page/guide/panorama.vue').default },
        { path: 'list',            component: require('../components/page/guide/list.vue').default },
        { path: 'list/:index',     component: require('../components/page/guide/list.vue').default },
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
