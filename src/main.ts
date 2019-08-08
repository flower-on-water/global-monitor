import Vue from 'vue';

import App from './ui/App.vue';
import router from './ui/router';

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
