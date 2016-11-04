import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/',             component: require('./components/panorama.vue') },
  { path: '/panorama',     component: require('./components/panorama.vue') },
  { path: '/panorama/:id', component: require('./components/panorama.vue') },
  { path: '/list',         component: require('./components/list.vue') },
  { path: '/list/:id',     component: require('./components/list.vue') },
  { path: '/about',        component: require('./components/about.vue') },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
})

// 登録
Vue.component('detail-drawer', require('./components/detail-drawer.vue'));

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')
