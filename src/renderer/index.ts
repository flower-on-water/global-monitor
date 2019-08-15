import Vue from 'vue';

import App from './App.vue';
import router from './routes';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App),
});
