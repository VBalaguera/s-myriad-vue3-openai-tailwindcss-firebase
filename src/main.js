import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueMeta, Meta } from 'vue-meta'

import './assets/styles/app.css'

createApp(App).use(router).use(store).use(VueMeta).use(Meta).mount('#app')
