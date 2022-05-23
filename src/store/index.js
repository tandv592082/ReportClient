import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import vote from './modules/vote';
import work from './modules/work';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    vote,
    user,
    work,
  },
});

export default store;
