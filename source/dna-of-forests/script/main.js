import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import _ from 'lodash';
import AppGuide from '../components/app.vue';
import VueGtm from 'vue-gtm'
import loadGoogleMapsAPI from 'load-google-maps-api';

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
  // replace viewport
  var vp = document.querySelector('head>meta[name="viewport"]');
  vp.content = vp.content.replace(/width=(\d+|device-width)/g, 'width=1150');
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
      component: require('../components/page/top.vue').default,
      meta: {gtm: 'Global Top'}
    },
    {
      path: '/:forest/',
      component: require('../components/page/guide.vue').default,
      meta: {gtm: 'Field Guide Top'},
      children: [
        { path: '',                component: require('../components/page/guide/panorama.vue').default, meta: {gtm: 'Field Guide Top'} },
        { path: 'panorama',        component: require('../components/page/guide/panorama.vue').default, meta: {gtm: 'Panorama'} },
        { path: 'panorama/:index', component: require('../components/page/guide/panorama.vue').default, meta: {gtm: 'Detail (Panorama)'} },
        { path: 'list',            component: require('../components/page/guide/list.vue').default,     meta: {gtm: 'List'} },
        { path: 'list/:index',     component: require('../components/page/guide/list.vue').default,     meta: {gtm: 'Detail (List)'} },
        { path: 'about',           component: require('../components/page/about.vue').default,          meta: {gtm: 'About'} }
      ]
    }
  ]
});

Vue.use(VueGtm, {
  debug: false, // Whether or not display console logs debugs (optional)
  vueRouter: router // Pass the router instance to automatically sync with router (optional)
})

// Registration
Vue.component('detail-drawer', require('../components/detail-drawer.vue').default);
Vue.component('global-nav',    require('../components/global-nav.vue').default);
Vue.component('imgr',          require('../components/imgr.vue').default);
Vue.component('imgr-sp',       require('../components/imgr-sp.vue').default);

loadGoogleMapsAPI({ key: 'AIzaSyDQoGu03t5Lxa7aVYgCMo7fwrgZmKIfIWQ' }).then(function(googleMaps) {

  // initialize App after loading google object
  new AppGuide({
    router: router,
    // TODO should load indivisual messages in each guides(guide.vue)
    i18n: new VueI18n({
      locale: document.querySelector('html').getAttribute('lang'),
      messages: _.merge(
        require('../messages.json'),
        require('../niho/messages.json'),
        require('../kumano/messages.json'),
        require('../chuo-park/messages.json')
      )
    })
  }).$mount('#app');

}).catch((err) => {
  console.error(err);
});