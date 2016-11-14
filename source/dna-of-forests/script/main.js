import Vue from 'vue';
import VueRouter from 'vue-router';
import MobileDetect from 'mobile-detect';

Vue.use(VueRouter);

if(!new MobileDetect(window.navigator.userAgent).mobile()){
  var video = document.createElement('video');
  video.id = 'video';
  video.src = '/dna-of-forests/img/panorama.mp4';
  video.autoplay = true;
  video.loop = true;
  video.style = 'display:none;';
  document.body.appendChild(video);
}

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: [
    { path: '/',                component: require('./components/panorama.vue') },
    { path: '/panorama',        component: require('./components/panorama.vue') },
    { path: '/panorama/:index', component: require('./components/panorama.vue') },
    { path: '/list',            component: require('./components/list.vue') },
    { path: '/list/:index',     component: require('./components/list.vue') },
    { path: '/about',           component: require('./components/about.vue') },
  ]
})

// 登録
Vue.component('detail-drawer', require('./components/detail-drawer.vue'));
Vue.component('global-nav', require('./components/global-nav.vue'));

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router: router,
  data: function(){
    return require('./data.json');
  }
}).$mount('#app')
