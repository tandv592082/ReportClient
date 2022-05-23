import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './permission';
import store from './store';
import '@/assets/main.scss';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
