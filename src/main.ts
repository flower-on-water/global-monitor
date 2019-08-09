import Vue from 'vue';

import App from './ui/App.vue';
import router from './ui/router';
import vuetify from './ui/plugins/vuetify';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App),
});
