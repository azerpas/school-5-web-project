import Vue from 'vue'
import App from './App.vue'
import Chakra from '@chakra-ui/vue'

Vue.config.productionTip = false

Vue.use(Chakra);

new Vue({
  render: h => h(App),
}).$mount('#app')
