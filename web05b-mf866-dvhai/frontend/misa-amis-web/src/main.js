import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
//import
import Vue from 'vue';
import store from './store';
import Bus from '../EventBus.js';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMask from 'v-mask';
import money from 'v-money';
import router from './router';
import vueDebounce from 'vue-debounce';

//use

Vue.use(Bus);
Vue.use(VueAxios, axios);
Vue.use(VueMask, { masked: false, placeholder: 'false' });
Vue.use(money);
Vue.use(vueDebounce);

// Or if you want to pass in the lock option
Vue.use(vueDebounce, {
  lock: true,
});

// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'input',
});

// Listening to multiple events
Vue.use(vueDebounce, {
  listenTo: ['keyup'],
});

// Setting a default timer This is set to '300ms' if not specified
Vue.use(vueDebounce, {
  defaultTime: '700ms',
});



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

//Định nghĩa prototy hashstring
String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

//Định nghĩa prototy fomat
String.prototype.format = function() {
  var ans = this;
  for (let k in arguments) {
    ans = ans.replace('{' + k + '}', arguments[k]);
  }
  return ans;
};