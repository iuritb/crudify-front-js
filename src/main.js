// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importa os estilos base do Vuetify
import router from './router' // Caso você esteja usando o Vue Router

// Cria a instância do Vuetify
const vuetify = createVuetify()

const app = createApp(App)

app.use(router)  // Registra o Vue Router, se estiver em uso
app.use(vuetify) // Registra o Vuetify na aplicação

app.mount('#app')
