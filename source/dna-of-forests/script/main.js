import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import _ from 'lodash';
import AppGuide from '../components/app.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

var ua = window.navigator.userAgent.toLowerCase();

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

var addBodyClass = function(class_name){
  document.querySelector('body').classList.add(class_name);
};

if(ua.indexOf('fban/fbios;fbav') != -1){
  // Facebook InApp Browser
  addBodyClass('fb_in_app_browser');
  // 下記でスクロールをOFFにできるが、サイト全体に影響してしまう
  // $(window).on('touchmove.noScroll', function(e) {
  //   e.preventDefault();
  // });
  // スクロール復活
  // $(window).off('.noScroll');
}
else if(ua.indexOf('iphone') > 0 || ua.indexOf('ipod') > 0 || ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0){
  addBodyClass('mobile');
  setViewportByOrientation();
  window.addEventListener('orientationchange', setViewportByOrientation);
}
else if(ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0){
  addBodyClass('pad');
  // TODO 正規表現でwidthだけ変える
  var vp = document.querySelector('head>meta[name="viewport"]');
  vp.content = 'width=1150';
}
else if(ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
  addBodyClass('ie');
}
else if(ua.indexOf('edge') != -1) {
  addBodyClass('edge');
}
else if(ua.indexOf('chrome') != -1) {
  addBodyClass('chrome');
}
else if(ua.indexOf('safari') != -1) {
  addBodyClass('safari');
}
else if(ua.indexOf('firefox') != -1) {
  addBodyClass('firefox');
}
else if(ua.indexOf('opera') != -1) {
  addBodyClass('opera');
}
else {
  //
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
        { path: 'about',           component: require('../niho/components/about.vue').default }
      ]
    }
  ]
});

// 登録
Vue.component('detail-drawer', require('../components/detail-drawer.vue').default);
Vue.component('global-nav',    require('../components/global-nav.vue').default);
Vue.component('imgr',          require('../components/imgr.vue').default);
Vue.component('imgr-sp',       require('../components/imgr-sp.vue').default);

new AppGuide({
  router: router,
  i18n: new VueI18n({
    locale: document.querySelector('html').getAttribute('lang'),
    messages: _.merge(
      require('../messages.json'),
      require('../niho/messages.json'),
      require('../kumano/messages.json')
    )
  }),
  data: function(){
    // isAlreadyDraggedを追加する
    // TODO ここ変える？
    var _data = _.cloneDeep(require('../niho/markers.json'));
    _data['isAlreadyDragged'] = false;
    return _data;
  }
}).$mount('#app');
