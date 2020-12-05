import Vue from 'vue'
import store from '../store'
import index from './index.vue'
// import router from './router'
// import store from './store';
Vue.config.productionTip = false
window.Vue = new Vue({
//   router,
  store,
  render: h => h(index)
}).$mount('#app')
