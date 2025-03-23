import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.min.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',  // Define o set padrão como Material Design Icons
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
