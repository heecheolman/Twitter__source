// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './config/router';
import { store } from './vuex/store';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  to.matched.some(record => record.meta.requiresAuth)
    ? store.getters['getLoginStatus']
      ? next()
      : next({ name : 'LoginPage' })
    : next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
