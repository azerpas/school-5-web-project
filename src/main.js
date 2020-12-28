import Vue from 'vue'
import App from './App.vue'
import Chakra, { CBox } from '@chakra-ui/vue'
import router from './router';
import { CThemeProvider, CColorModeProvider, CReset } from '@chakra-ui/vue'

//import NotFound from "./pages/Landing.vue";

Vue.config.productionTip = false

Vue.use(Chakra);

new Vue({
    router,
    render: (h) => h(CThemeProvider, [
        h(CColorModeProvider, [
          h(CBox, [
            h(CReset),
            h(App)
          ])
        ])
    ])
}).$mount('#app')
