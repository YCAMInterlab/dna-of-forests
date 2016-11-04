import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

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

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router: router,
  data: function(){
    return require('./data.json');
  }
}).$mount('#app')
