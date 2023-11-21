import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './style.css'

import App from './App.vue'

import Index from './pages/index.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/:id?', component: Index }
  ]
})

app.use(router)
app.mount('#app')
