import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'
import router from './router/routes.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


createApp(App).use(router).mount('#app')