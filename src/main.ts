import './assets/main.css'
import 'ant-design-vue/dist/antd.css'
import 'virtual:uno.css'
import {createApp} from "vue"
import App from './App.vue'
import {setupRouter} from "./router"

const setupApp = () => {
  const app = createApp(App)

  setupRouter(app)
  app.mount('#app')
}

setupApp()

