// store.js
import Vue from 'vue';
import Vuex from 'vuex';

import join from './modules/join';
import login from './modules/login';
import main from './modules/main';
import tweet from './modules/tweet';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    join,
    login,
    main,
    tweet,
  },
  state: {
    login: false,
  },
  getters: {
    getLoginStatus: state => state.login,
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.login = payload;
    },
  },
});

